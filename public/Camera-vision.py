import cv2
import numpy as np

# ── CONFIG ──────────────────────────────────────────────
CAMERA_INDEX = 0

REAL_POINTS = np.array([
    [0,   0  ],
    [210, 0  ],
    [210, 297],
    [0,   297]
], dtype=np.float32)
# ────────────────────────────────────────────────────────

pixel_points = []
drawn_points = []
homography = None

# Each line stored as: ((x1,y1), (x2,y2), (rx1,ry1), (rx2,ry2))
lines = []
current_start = None  # first click of a new line

def transform_point(px, py):
    pt = np.array([[[px, py]]], dtype=np.float32)
    result = cv2.perspectiveTransform(pt, homography)
    rx, ry = result[0][0]
    return round(float(rx), 1), round(float(ry), 1)

def save_coordinates():
    with open("coordinates.txt", "w") as f:
        f.write("Line coordinates (real world in mm)\n")
        f.write("=" * 40 + "\n")
        for i, line in enumerate(lines):
            p1, p2, r1, r2 = line
            f.write(f"Line {i+1}:\n")
            f.write(f"  Start: ({r1[0]}, {r1[1]}) mm\n")
            f.write(f"  End:   ({r2[0]}, {r2[1]}) mm\n")
    print(f"✅ Saved {len(lines)} lines to coordinates.txt")

def mouse_click(event, x, y, flags, param):
    global homography, current_start

    if event == cv2.EVENT_LBUTTONDOWN:

        # ── Calibration phase (first 4 clicks) ──
        if len(pixel_points) < 4:
            pixel_points.append([x, y])
            print(f"Calibration point {len(pixel_points)}: pixel ({x}, {y})")
            if len(pixel_points) == 4:
                pts = np.array(pixel_points, dtype=np.float32)
                homography, _ = cv2.findHomography(pts, REAL_POINTS)
                print("\n✅ Calibration done!")
                print("   Left-click = start/end a line | Right-click = clear | S = save\n")
            return

        # ── Drawing phase ──
        rx, ry = transform_point(x, y)

        if current_start is None:
            # First click — set start point
            current_start = ((x, y), (rx, ry))
            print(f"Line start: ({rx}, {ry}) mm")
        else:
            # Second click — complete the line
            p1_px, r1 = current_start
            p2_px = (x, y)
            r2 = (rx, ry)
            lines.append((p1_px, p2_px, r1, r2))
            print(f"Line end:   ({rx}, {ry}) mm")
            print(f"  → Line {len(lines)}: ({r1[0]},{r1[1]}) to ({r2[0]},{r2[1]}) mm\n")
            current_start = None  # ready for next line

    elif event == cv2.EVENT_RBUTTONDOWN:
        pixel_points.clear()
        lines.clear()
        homography = None
        current_start = None
        print("🔄 Reset everything.")

# ── MAIN LOOP ────────────────────────────────────────────
cap = cv2.VideoCapture(CAMERA_INDEX)
cv2.namedWindow("Machine Vision")
cv2.setMouseCallback("Machine Vision", mouse_click)

print("📍 Click your 4 corners in this order:")
print("   Top-left → Top-right → Bottom-right → Bottom-left\n")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Camera not found.")
        break

    display = frame.copy()

    # Draw calibration points
    for i, pt in enumerate(pixel_points):
        cv2.circle(display, tuple(pt), 6, (0, 255, 0), -1)
        cv2.putText(display, str(i+1), (pt[0]+8, pt[1]-8),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    if len(pixel_points) == 4:
        pts_draw = np.array(pixel_points, dtype=np.int32)
        cv2.polylines(display, [pts_draw], True, (0, 255, 0), 1)

    if homography is not None:
        # Draw all completed lines
        for line in lines:
            p1_px, p2_px, r1, r2 = line
            cv2.circle(display, p1_px, 5, (0, 100, 255), -1)
            cv2.circle(display, p2_px, 5, (0, 100, 255), -1)
            cv2.line(display, p1_px, p2_px, (0, 100, 255), 2)
            cv2.putText(display, f"({r1[0]},{r1[1]})", (p1_px[0]+6, p1_px[1]-8),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 100, 255), 1)
            cv2.putText(display, f"({r2[0]},{r2[1]})", (p2_px[0]+6, p2_px[1]-8),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 100, 255), 1)

        # Draw current start point waiting for second click
        if current_start is not None:
            p1_px, r1 = current_start
            cv2.circle(display, p1_px, 7, (0, 255, 255), -1)
            cv2.putText(display, "click end point", (p1_px[0]+8, p1_px[1]-8),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)

    # Status bar
    if homography is None:
        status = f"Calibrating: {len(pixel_points)}/4 corners"
        color = (0, 255, 0)
    elif current_start is None:
        status = f"Click line start | {len(lines)} lines drawn | S=save | Right-click=reset"
        color = (0, 200, 255)
    else:
        status = "Now click the end point of this line"
        color = (0, 255, 255)

    cv2.putText(display, status, (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

    cv2.imshow("Machine Vision", display)

    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    elif key == ord('s'):
        if lines:
            save_coordinates()
        else:
            print("No lines drawn yet.")

cap.release()
cv2.destroyAllWindows()