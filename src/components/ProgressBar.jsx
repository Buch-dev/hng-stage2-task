// filepath: /c:/Users/LENOVO/Documents/task-2/conference-ticket/src/components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  const getStepText = (step) => {
    switch (step) {
      case 1:
        return "Ticket Selection";
      case 2:
        return "Attendee Details";
      case 3:
        return "Ready";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center md:justify-between text-white w-full">
        <h3 className=" text-2xl md:text-[32px] font-jeju">
          {getStepText(currentStep)}
        </h3>
        <p className="text-base">
          Step {currentStep}/{totalSteps}
        </p>
      </div>
      <div className="w-full h-[4px] bg-[#0E464F] rounded overflow-hidden mt-2.5">
        <div
          className="h-full bg-[#24A0B5] transition-all"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;