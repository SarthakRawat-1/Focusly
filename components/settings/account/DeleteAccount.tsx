"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/loadingState";
import Warning from "@/components/ui/warning";
import { useToast } from "@/hooks/use-toast";
import {
  deleteAccountSchema,
  DeleteAccountSchema,
} from "@/schema/deleteAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

interface Props {
  userEmail: string;
}

export const DeleteAccount = ({ userEmail }: Props) => {
  const t = useTranslations("SETTINGS.ACCOUNT");
  const { toast } = useToast();
  const m = useTranslations("MESSAGES");
  const lang = useLocale();

  const form = useForm<DeleteAccountSchema>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: deleteProfile, isPending } = useMutation({
    mutationFn: async (formData: DeleteAccountSchema) => {
      const { data } = (await axios.post(
        "/api/profile/delete",
        formData
      )) as AxiosResponse<DeleteAccountSchema>;

      return data;
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      toast({
        title: m(error),
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      toast({
        title: m("SUCCESS.DELETED_INFO"),
      });

      signOut({
        callbackUrl: `${window.location.origin}/${lang}`,
      });
    },
    mutationKey: ["deleteProfile"],
  });

  const onSubmit = (data: DeleteAccountSchema) => {
    deleteProfile(data);
  };

  return (
    <Card className="border border-destructive/20 shadow-sm bg-destructive/5 backdrop-blur-sm max-w-2xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <svg
              className="w-5 h-5 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-destructive">{t("DELETE_TITLE")}</h3>
            <p className="text-sm text-muted-foreground">{t("DELETE_DESC")}</p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-sm"
          >
            <div className="space-y-2 sm:space-y-4 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-muted-foreground uppercase text-xs">
                      {t("DELETE_LABEL")}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t("DELETE_PLACEHOLDER")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  //   disabled={!form.formState.isValid}
                  type="button"
                  variant={"destructive"}
                  className=""
                >
                  {t("DELETE_BTN")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-destructive">
                    {t("DIALOG.TITLE")}
                  </DialogTitle>
                  <DialogDescription>{t("DIALOG.DESC")}</DialogDescription>
                </DialogHeader>
                <Warning>
                  <p>{t("DIALOG.WARNING")}</p>
                </Warning>
                <Button
                  disabled={isPending}
                  onClick={form.handleSubmit(onSubmit)}
                  size={"lg"}
                  variant={"destructive"}
                >
                  {isPending ? (
                    <LoadingState loadingText={t("DIALOG.PENDING_BTN")} />
                  ) : (
                    t("DIALOG.BUTTON")
                  )}
                </Button>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
