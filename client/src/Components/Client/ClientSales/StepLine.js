import React from 'react';

const StepLine = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex items-center ${
              index === 0 ? 'pl-0' : 'pl-4'
            } ${index === steps.length - 1 ? 'pr-0' : 'pr-4'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                index < currentStep
                  ? 'bg-green-500'
                  : index === currentStep
                  ? 'bg-teal-500'
                  : 'bg-gray-400'
              }`}
            >
              {index < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`ml-2 ${
                index < currentStep
                  ? 'text-gray-500'
                  : index === currentStep
                  ? 'text-teal-500'
                  : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                index < currentStep - 1
                  ? 'bg-green-500'
                  : index === currentStep - 1
                  ? 'bg-teal-500'
                  : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepLine;