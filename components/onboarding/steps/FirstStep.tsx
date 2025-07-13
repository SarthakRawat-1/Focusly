import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnboardingForm } from "@/context/OnboardingForm";
import {
  additionalUserInfoFirstPart,
  AdditionalUserInfoFirstPart,
} from "@/schema/additionalUserInfoFirstPart";
import { ActionType } from "@/types/onBoardingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddUserImage } from "../common/AddUserImage";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

interface Props {
  profileImage?: string | null;
}

export const FirstStep = ({ profileImage }: Props) => {
  const session = useSession();
  const { currentStep, name, surname, dispatch } = useOnboardingForm();
  const form = useForm<AdditionalUserInfoFirstPart>({
    resolver: zodResolver(additionalUserInfoFirstPart),
    defaultValues: {
      name: name ? name : "",
      surname: surname ? surname : "",
    },
  });
  const t = useTranslations("ONBOARDING_FORM");

  useEffect(() => {
    dispatch({
      type: ActionType.PROFILEIMAGE,
      payload: profileImage as string | null | undefined,
    });
  }, [profileImage, dispatch]);

  const onSubmit = (data: AdditionalUserInfoFirstPart) => {
    
    dispatch({ type: ActionType.NAME, payload: data.name! });
    dispatch({ type: ActionType.SURNAME, payload: data.surname! });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="font-bold text-3xl md:text-4xl text-foreground">
          {t("FIRST_STEP.TITLE.FIRST")} <span className="text-primary">{t("FIRST_STEP.TITLE.SECOND")}</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Tell us a bit about yourself to personalize your experience
        </p>
      </div>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">{t("FIRST_STEP.PHOTO")}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add a profile picture to help your team recognize you
          </p>
        </div>
        <AddUserImage profileImage={profileImage} />
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    {t("FIRST_STEP.INPUTS.NAME")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 border-border/50 focus:border-primary transition-colors"
                      placeholder={t("FIRST_STEP.PLACEHOLDER.NAME")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    {t("FIRST_STEP.INPUTS.SURNAME")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 border-border/50 focus:border-primary transition-colors"
                      placeholder={t("FIRST_STEP.PLACEHOLDER.SURNAME")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-4">
            <Button className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors">
              {t("NEXT_BTN")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
