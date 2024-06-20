import React, { useState, useContext } from 'react';
import { AvailabilityContext } from './availabilityContext';
import StepperControl from "./StepperControl";

interface AvailabilityContextInterface {
  status: string | undefined,
  setStatus: (status: string) => void,
  availability: string,
  setAvailability: (availability: string) => void,
}

interface AvailabilitySectionProps {
  currentStep: number;
  steps: string[];
  handleNext: () => void;
  handlePrev: () => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = (props) => {
  const { currentStep, steps, handleNext, handlePrev } = props;
  const { status, setStatus, availability, setAvailability } = useContext(AvailabilityContext)!;

  const renderBars = () => {
    const max = 12;
    const bars = [];
    for (let i = 1; i <= max; i++) {
      bars.push(<div key={i} className="bar"></div>);
    }
    return bars;
  };

  return (
    <div className="py-6 px-4 bg-[#1f1f1f] rounded-md">
      <h2 className="mb-4 text-[18px] font-medium">Availability</h2>
      <div className="availability-options">
        <div className='bg-[#2d2d2d] py-3 px-3 rounded-md grid gap-3'>
          <div className="flex items-center">
            <input
              type="radio"
              id="active"
              className="custom-radio"
              name="status"
              value="Actively looking for a job"
              checked={status === "Actively looking for a job"}
              onChange={() => setStatus("Actively looking for a job")}
            />
            <label className='text-[14px] font-medium' htmlFor="active">Actively looking for a job</label>
          </div>
          {status === "Actively looking for a job" && (
            <div className="availability-slider">
              <label htmlFor="availability" className="flex justify-between">
                <span className='text-[14px] font-medium'>Your availability</span> 
                <span className='text-[14px] font-medium'>{availability}</span>
              </label>
              <input
                type="range"
                id="availability"
                name="availability"
                min="1"
                max="12"
                value={availability.split(" ")[0]}
                onChange={(e) =>
                  setAvailability(
                    `${e.target.value} month${Number(e.target.value) > 1 ? "s" : ""}`
                  )
                }
              />
              <div className="slider-bars">
                {renderBars()}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center bg-[#2d2d2d] py-3 px-3 rounded-md">
          <input
            type="radio"
            id="open"
            className="custom-radio"
            name="status"
            value="I'm open to opportunities"
            checked={status === "I'm open to opportunities"}
            onChange={() => setStatus("I'm open to opportunities")}
          />
          <label className='text-[14px] font-medium' htmlFor="open">I'm open to opportunities</label>
        </div>
        <div className="flex items-center bg-[#2d2d2d] py-3 px-3 rounded-md">
          <input
            type="radio"
            id="exploring"
            className="custom-radio"
            name="status"
            value="Not sure, I'm just exploring"
            checked={status === "Not sure, I'm just exploring"}
            onChange={() => setStatus("Not sure, I'm just exploring")}
          />
          <label className='text-[14px] font-medium' htmlFor="exploring">Not sure, I'm just exploring</label>
        </div>
      </div>
      <StepperControl
        currentStep={currentStep}
        steps={steps}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default AvailabilitySection;
