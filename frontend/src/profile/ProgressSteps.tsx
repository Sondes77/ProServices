import React from 'react';

const steps = [
  { title: 'Vérification adresse mail' },
  //{ title: 'Vérification téléphone' },
  { title: 'Informations personnelles' },
  { title: 'Publier un service' },
];

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-1 py-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold
                ${index < currentStep
                  ? 'bg-[#e0692d] border-[#e0692d] text-white'
                  : index === currentStep
                  ? ' border-[#e0692d] text-gray-500'
                  : 'border-gray-300 text-gray-500'}
              `}
            >
              {index + 1}
            </div>
            <div className="text-xs mt-1 text-center w-24">{step.title}</div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 bg-gray-300 relative top-4">
              <div
                className={`h-1 ${index < currentStep - 1 ? 'bg-[#e0692d]' : 'bg-gray-300'}`}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;
