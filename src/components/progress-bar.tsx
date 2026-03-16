interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const segments = Array.from({ length: total }, (_, i) => i);

  return (
    <div className="content-stretch flex gap-[100px] items-center relative shrink-0 w-full">
      {segments.map((index) => (
        <div key={index} className="h-0 relative shrink-0 w-[100px]">
          <div className="absolute inset-[-5px_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110 10">
              <path
                d="M5 5H105"
                stroke={index < completed ? "var(--stroke-0, #34C759)" : "var(--stroke-0, #787878)"}
                strokeLinecap="round"
                strokeOpacity={index < completed ? "1" : "0.2"}
                strokeWidth="10"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
