import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Stepper from "./Components/Stepper";
import { AvailabilityProvider } from "./Components/availabilityContext";
import ProfileStableSection from "./Components/ProfileStableSection";
import StepperControl from "./Components/StepperControl";
import SkillsSection from "./Components/SkillsSection";
import AvailabilitySection from "./Components/AvailbilitySection";
import HomePage from "./Components/HomePage";

const steps: string[] = ["Step 1", "Step 2", "Step 3", "Step 4"];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);

  const handleNext = (): void => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStart = (): void => {
    setStarted(true);
    setCurrentStep(1);
  };

  return (
    <div className="dark:bg-black h-[100vh]">
      <Navbar />
      <div className="max-w-screen-xl px-4 md:px-24 py-8 mx-auto">
        <Stepper steps={steps} currentStep={currentStep} />
        {!started ? (
          <HomePage handleStart={handleStart} />
        ) : (
          <AvailabilityProvider>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:px-6">
              <div className="grid">
                {currentStep === 1 && <SkillsSection currentStep={currentStep} steps={steps} handleNext={handleNext} handlePrev={handlePrev} />}
                {currentStep === 2 && <AvailabilitySection currentStep={currentStep} steps={steps} handleNext={handleNext} handlePrev={handlePrev} />}
              </div>
              <ProfileStableSection index={currentStep} />
            </div>
          </AvailabilityProvider>
        )}
      </div>
    </div>
  );
};

export default App;
