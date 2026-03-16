import { useState, useEffect } from 'react';
import { ProgressBar } from './progress-bar.tsx';
import { CheckButton } from './check-button.tsx';

interface CheckStep {
  type: 'auto' | 'manual';
  message: string;
  completedBars: number;
  duration?: number; // 自动步骤的持续时间（毫秒）
}

interface ButtonProps {
    onClick: () => void;
}

const checkSteps: CheckStep[] = [
  {
    type: 'auto',
    message: 'Checking Lidar ...',
    completedBars: 0,
    duration: 2000,
  },
  {
    type: 'auto',
    message: 'Lidar functional ✅',
    completedBars: 1,
    duration: 1500,
  },
  {
    type: 'auto',
    message: 'Checking pressure sensor ...',
    completedBars: 1,
    duration: 2000,
  },
  {
    type: 'auto',
    message: 'Pressure sensor functional ✅',
    completedBars: 2,
    duration: 1500,
  },
  {
    type: 'auto',
    message: 'Resetting CNC to home ...',
    completedBars: 2,
    duration: 2000,
  },
  {
    type: 'auto',
    message: 'CNC set to home ✅',
    completedBars: 3,
    duration: 1500,
  },
  {
    type: 'manual',
    message: 'Please make sure that the correct brush is attached',
    completedBars: 3,
  },
  {
    type: 'manual',
    message: 'Please confirm the steam pressure is optimal',
    completedBars: 4,
  },
  {
    type: 'manual',
    message: 'Please make sure the core tray placed correctly',
    completedBars: 5,
  },
];

const StartupScreen = ({ onClick }: ButtonProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const onFinish = onClick;

  const step = checkSteps[currentStep];
  const isAutoCheck = step && (currentStep < 6);

  useEffect(() => {
    if (!step) {
      setIsComplete(true);
      return;
    }

    if (step.type === 'auto' && step.duration) {
      const timer = setTimeout(() => {
        if (currentStep < checkSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsComplete(true);
        }
      }, step.duration);

      return () => clearTimeout(timer);
    }
  }, [currentStep, step]);

  const handleManualConfirm = () => {
    if (currentStep < checkSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className="bg-white content-stretch flex flex-col gap-[111px] items-center justify-center pb-[390px] pt-[89px] px-[90px] relative size-full">
        <div className="content-stretch flex flex-col gap-[183px] items-center relative shrink-0 w-[1100px]">
          <div className="content-stretch flex flex-col gap-[66px] items-center relative shrink-0 w-full">
            <ProgressBar completed={6} total={6} />
            <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
              <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[26px] text-[rgba(60,60,67,0.6)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                All Checks Complete
              </p>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
            <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[26px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              System is ready to operate
            </p>
          </div>
          <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
            <CheckButton onClick={onFinish} label={"Start machine"} />
          </div>
        </div>
      </div>
    );
  }

  if (!step) return null;

  return (
    <div className="bg-white content-stretch flex flex-col gap-[111px] items-center pb-[390px] pt-[89px] px-[90px] relative size-full">
      <div className="content-stretch flex flex-col gap-[183px] items-center relative shrink-0 w-[1100px]">
        <div className="content-stretch flex flex-col gap-[66px] items-center relative shrink-0 w-full">
          <ProgressBar completed={step.completedBars} total={6} />
          <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
            <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[26px] text-[rgba(60,60,67,0.6)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              {isAutoCheck ? 'Auto Check' : 'Manual Check'}
            </p>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0">
          <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[26px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            {step.message}
          </p>
        </div>
      </div>
      {step.type === 'manual' && <CheckButton onClick={handleManualConfirm} label={"Confirmed!"} />}
    </div>
  );
}


export default StartupScreen;