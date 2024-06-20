import React from 'react';
import Arrow from "../Assets/arrow.svg"
interface StepperControlProps {
  onNext: () => void;
  onPrev: () => void;
  currentStep: number,
  steps: string[]
}
const StepperControl: React.FC<StepperControlProps> = ({ currentStep, steps, onNext, onPrev }) => {
  return (
    <div className="flex gap-4 mt-4">
      <button onClick={onPrev} className="h-[48px] border border-[rgba(255,255,255,0.12)] px-3 py-2 rounded-lg"  disabled={currentStep + 1 === 2}>Previous</button>
      <button className="h-[48px] flex items-center gap-4 bg-gradient-to-r from-[#986EEB] via-[#FD68B3] to-[#FDB786] text-white border-none text-base font-bold  px-[20px] py-2 rounded-lg ease-in-out duration-300 hover:opacity-80 " disabled={currentStep + 1 === steps.length - 1} onClick={onNext}>
        Next
        <img src={Arrow} alt="arrow" />
      </button>
    </div>
  );
};

export default StepperControl;
