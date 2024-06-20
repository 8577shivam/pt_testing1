import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  let content = "";
  let currentIndex = currentStep + 1;
  switch (currentIndex) {
    case 1:
      content = "Let's add your skills";
      break;
    case 2:
      content = "Tell us about your work experience";
      break;
    case 3:
      content = "Let recruiters know your availability";
      break;
    default:
      content = "Content will be here";
  }

  return (
    <div className="grid justify-center">
      <div className="flex justify-between items-center gap-6">

        <p className="text-4 font-medium">{content}</p>
        
      </div>
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center ">
            {index < steps.length - 1 && (
              <div
                className={`transition-colors duration-500 ease-in-out w-[60px] h-2 rounded-md mx-2 ${
                  index <= currentStep ? "bg-purple-500" : "bg-gray-500"
                }`}
              ></div>
            )}
          </div>
        ))}
        <p>
          {currentStep + 1}/{steps.length-1}
        </p>
      </div>
    </div>
  );
};

export default Stepper;
