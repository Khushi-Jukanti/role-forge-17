import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import Step1BasicInfo from './Onboarding/Step1BasicInfo';
import Step2Address from './Onboarding/Step2Address';
import Step3Services from './Onboarding/Step3Services';
import Step4PhotosDocuments from './Onboarding/Step4PhotosDocuments';
import Step5Therapists from './Onboarding/Step5Therapists';
import Step6Schedules from './Onboarding/Step6Schedules';
import Step7Review from './Onboarding/Step7Review';

const steps = [
  { id: 1, title: 'Basic Info', component: Step1BasicInfo },
  { id: 2, title: 'Address', component: Step2Address },
  { id: 3, title: 'Services', component: Step3Services },
  { id: 4, title: 'Photos & Docs', component: Step4PhotosDocuments },
  { id: 5, title: 'Therapists', component: Step5Therapists },
  { id: 6, title: 'Schedules', component: Step6Schedules },
  { id: 7, title: 'Review', component: Step7Review },
];

export default function CdcAdminOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goToNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">CDC Onboarding</h1>
          <p className="text-muted-foreground">Complete all steps to register your CDC</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map(step => (
              <div key={step.id} className="text-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm font-semibold ${
                    step.id === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : step.id < currentStep
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.id}
                </div>
                <p className="text-xs mt-1 text-muted-foreground">{step.title}</p>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <CurrentStepComponent
          data={formData}
          onUpdate={updateFormData}
          onNext={goToNext}
          onBack={goToPrevious}
        />
      </div>
    </div>
  );
}
