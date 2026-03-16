import { useState, useEffect } from "react";

interface ProgressScreenProps {
  config: { coreType: string | null; tray: number; cores: number };
  onReset: () => void;
}

const ProgressScreen = ({ config, onReset }: ProgressScreenProps) => {
  const [progress, setProgress] = useState(0);
  const isComplete = progress >= 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-[1022px]">
      {/* Config summary */}
      <div className="mb-12 flex gap-6 justify-center flex-wrap">
        {config.coreType && (
          <div className="bg-[#f5f5f5] rounded-2xl px-6 py-3 text-center">
            <p className="text-[13px] text-gray-400 mb-1">Preset</p>
            <p className="text-[16px] text-black">{config.coreType}</p>
          </div>
        )}
        <div className="bg-[#f5f5f5] rounded-2xl px-6 py-3 text-center">
          <p className="text-[13px] text-gray-400 mb-1">Tray</p>
          <p className="text-[16px] text-black">{config.tray}</p>
        </div>
        <div className="bg-[#f5f5f5] rounded-2xl px-6 py-3 text-center">
          <p className="text-[13px] text-gray-400 mb-1">Cores</p>
          <p className="text-[16px] text-black">{config.cores}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full mb-4">
        <div className="relative h-[24px] w-full bg-[#d9d9d9] rounded-[44px] overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-[#34c759] rounded-[44px] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 px-1">
          <p className="text-[14px] text-gray-500">
            {isComplete ? "Complete!" : "Processing..."}
          </p>
          <p className="text-[14px] text-gray-500">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Action button */}
      {isComplete && (
        <button
          onClick={onReset}
          className="mt-8 h-[47px] w-[285px] rounded-[100px] bg-[#08f] text-white text-[18px] cursor-pointer hover:bg-[#007ae6] active:scale-95 transition-all"
        >
          New Task
        </button>
      )}
    </div>
  );
};

export default ProgressScreen;