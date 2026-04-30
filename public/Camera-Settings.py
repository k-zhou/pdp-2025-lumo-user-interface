import cv2
import numpy as np

CAMERA_INDEX = 0

def nothing(x):
    pass

cap = cv2.VideoCapture(CAMERA_INDEX)

cv2.namedWindow("Camera Settings")
cv2.resizeWindow("Camera Settings", 500, 400)

cv2.createTrackbar("Brightness",  "Camera Settings", 50,  100, nothing)
cv2.createTrackbar("Contrast",    "Camera Settings", 50,  100, nothing)
cv2.createTrackbar("Saturation",  "Camera Settings", 50,  100, nothing)
cv2.createTrackbar("Sharpness",   "Camera Settings", 50,  100, nothing)
cv2.createTrackbar("Exposure",    "Camera Settings", 50,  100, nothing)
cv2.createTrackbar("Zoom",        "Camera Settings", 0,   50,  nothing)
cv2.createTrackbar("Rotate",      "Camera Settings", 0,   3,   nothing)  # 0=none 1=90 2=180 3=270
cv2.createTrackbar("Flip H",      "Camera Settings", 0,   1,   nothing)
cv2.createTrackbar("Flip V",      "Camera Settings", 0,   1,   nothing)

print("Adjust sliders in the 'Camera Settings' window")
print("Rotate: 0=none  1=90°  2=180°  3=270°")
print("Press S to save settings | Q to quit\n")

def apply_zoom(frame, zoom_level):
    if zoom_level == 0:
        return frame
    h, w = frame.shape[:2]
    crop = int(zoom_level * 0.01 * min(h, w) / 2)
    cropped = frame[crop:h-crop, crop:w-crop]
    return cv2.resize(cropped, (w, h))

def apply_rotate(frame, rotate_val):
    if rotate_val == 0:
        return frame
    elif rotate_val == 1:
        return cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)
    elif rotate_val == 2:
        return cv2.rotate(frame, cv2.ROTATE_180)
    elif rotate_val == 3:
        return cv2.rotate(frame, cv2.ROTATE_90_COUNTERCLOCKWISE)

def save_settings(settings):
    with open("camera_settings.txt", "w") as f:
        f.write("Saved Camera Settings\n")
        f.write("=" * 30 + "\n")
        for key, val in settings.items():
            f.write(f"{key}: {val}\n")
    print("✅ Settings saved to camera_settings.txt")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Camera not found.")
        break

    brightness  = cv2.getTrackbarPos("Brightness",  "Camera Settings")
    contrast    = cv2.getTrackbarPos("Contrast",    "Camera Settings")
    saturation  = cv2.getTrackbarPos("Saturation",  "Camera Settings")
    sharpness   = cv2.getTrackbarPos("Sharpness",   "Camera Settings")
    exposure    = cv2.getTrackbarPos("Exposure",    "Camera Settings")
    zoom        = cv2.getTrackbarPos("Zoom",        "Camera Settings")
    rotate      = cv2.getTrackbarPos("Rotate",      "Camera Settings")
    flip_h      = cv2.getTrackbarPos("Flip H",      "Camera Settings")
    flip_v      = cv2.getTrackbarPos("Flip V",      "Camera Settings")

    # Brightness & Contrast
    alpha = contrast / 50.0
    beta  = (brightness - 50) * 2
    frame = cv2.convertScaleAbs(frame, alpha=alpha, beta=beta)

    # Saturation
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:, :, 1] *= (saturation / 50.0)
    hsv[:, :, 1]  = np.clip(hsv[:, :, 1], 0, 255)
    frame = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

    # Sharpness
    if sharpness > 50:
        blur     = cv2.GaussianBlur(frame, (0, 0), 3)
        strength = (sharpness - 50) / 50.0
        frame    = cv2.addWeighted(frame, 1 + strength, blur, -strength, 0)

    # Exposure
    exp_factor = exposure / 50.0
    frame = np.clip(frame.astype(np.float32) * exp_factor, 0, 255).astype(np.uint8)

    # Zoom
    frame = apply_zoom(frame, zoom)

    # Rotate — applied before flip
    frame = apply_rotate(frame, rotate)

    # Flip
    if flip_h == 1 and flip_v == 1:
        frame = cv2.flip(frame, -1)
    elif flip_h == 1:
        frame = cv2.flip(frame, 1)
    elif flip_v == 1:
        frame = cv2.flip(frame, 0)

    # Labels on screen
    rotate_labels = {0: "none", 1: "90°", 2: "180°", 3: "270°"}
    labels = [
        f"Brightness: {brightness}",
        f"Contrast:   {contrast}",
        f"Saturation: {saturation}",
        f"Sharpness:  {sharpness}",
        f"Exposure:   {exposure}",
        f"Zoom:       {zoom}%",
        f"Rotate:     {rotate_labels[rotate]}",
    ]
    for i, text in enumerate(labels):
        cv2.putText(frame, text, (10, 30 + i * 22),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0, 255, 0), 1)

    cv2.putText(frame, "S = save settings | Q = quit", (10, frame.shape[0] - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 200, 255), 1)

    cv2.imshow("Camera Preview", frame)

    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    elif key == ord('s'):
        save_settings({
            "Brightness":  brightness,
            "Contrast":    contrast,
            "Saturation":  saturation,
            "Sharpness":   sharpness,
            "Exposure":    exposure,
            "Zoom":        zoom,
            "Rotate":      rotate,
            "Flip H":      flip_h,
            "Flip V":      flip_v,
        })

cap.release()
cv2.destroyAllWindows()