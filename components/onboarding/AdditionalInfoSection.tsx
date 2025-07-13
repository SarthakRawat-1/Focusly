"use client";

import { useOnboardingForm } from "@/context/OnboardingForm";
import { FirstStep } from "../onboarding/steps/FirstStep";
import { SecondStep } from "../onboarding/steps/SecondStep";
import { ThirdStep } from "../onboarding/steps/ThirdStep";
import { FormStepsInfo } from "./FormStepsInfo";
import { AppTitle } from "../ui/app-title";
import { Finish } from "./steps/Finish";
import { Card, CardContent } from "../ui/card";

interface Props {
  profileImage?: string | null;
}

export const AdditionalInfoSection = ({ profileImage }: Props) => {
  const { currentStep } = useOnboardingForm();

  return (
    <section className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <AppTitle size={60} />
          <p className="text-muted-foreground mt-4 text-lg">
            Let's get you set up with your new workspace
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-8 md:p-12">
            {currentStep === 1 && <FirstStep profileImage={profileImage} />}
            {currentStep === 2 && <SecondStep />}
            {currentStep === 3 && <ThirdStep />}
            {currentStep === 4 && <Finish />}
          </CardContent>
        </Card>

        {/* Steps Info */}
        <div className="mt-8">
          <FormStepsInfo />
        </div>
      </div>
    </section>
  );
};
