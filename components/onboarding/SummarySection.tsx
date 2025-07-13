"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useOnboardingForm } from "@/context/OnboardingForm";
import { UserAvatar } from "../ui/user-avatar";
import { useTranslations } from "next-intl";
import { Badge } from "../ui/badge";
import { CheckCircle, User, Briefcase, GraduationCap, Home } from "lucide-react";

export const SummarySection = () => {
  const { name, surname, profileImage, useCase, currentStep } =
    useOnboardingForm();
  const t = useTranslations("ONBOARDING_FORM");
  
  const getUseCaseIcon = () => {
    switch (useCase) {
      case "WORK":
        return <Briefcase className="h-4 w-4" />;
      case "STUDY":
        return <GraduationCap className="h-4 w-4" />;
      case "PERSONAL_USE":
        return <Home className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <section className="hidden lg:w-1/2 lg:flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="w-full max-w-md p-8">
        {/* Preview Card */}
        <Card className="border-border/50 shadow-xl bg-background/95 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Profile Image */}
              <div className="relative">
                <UserAvatar
                  className="w-24 h-24 shadow-lg border-4 border-background"
                  size={40}
                  profileImage={profileImage}
                />
                {profileImage && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="space-y-2">
                {name || surname ? (
                  <h3 className="text-2xl font-bold text-foreground">
                    {name} {surname}
                  </h3>
                ) : (
                  <div className="bg-muted rounded-lg h-8 w-32 mx-auto animate-pulse" />
                )}
              </div>

              {/* Use Case */}
              <div className="space-y-3">
                {useCase ? (
                  <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                    {getUseCaseIcon()}
                    <span className="ml-2">
                      {useCase === "WORK" && t("SECOND_STEP.WORK")}
                      {useCase === "STUDY" && t("SECOND_STEP.STUDY")}
                      {useCase === "PERSONAL_USE" && t("SECOND_STEP.PERSONAL")}
                    </span>
                  </Badge>
                ) : (
                  <div className="bg-muted rounded-full h-8 w-24 mx-auto animate-pulse" />
                )}
              </div>

              {/* Progress Indicator */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span>Step {currentStep} of 4</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 rounded-full ${
                          step <= currentStep
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Preview of your profile
          </p>
        </div>
      </div>
    </section>
  );
};
