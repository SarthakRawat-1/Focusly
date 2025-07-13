import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Warning from "@/components/ui/warning";
import { useTranslations } from "next-intl";
import { ChangePassword } from "./ChangePassword";

export const SecurityCard = () => {
  const t = useTranslations("SETTINGS.SECURITY");
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t("TITLE")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("DESC")}
            </p>
          </div>
        </div>
      </div>

      {/* Warning Section */}
      <Card className="border border-destructive/20 shadow-sm bg-destructive/5 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-destructive/10 rounded-lg flex-shrink-0">
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
            <div className="space-y-2">
              <h3 className="font-semibold text-destructive">Security Notice</h3>
              <div className="text-sm text-muted-foreground leading-relaxed">
                <p>{t("WARNING.FIRST")}</p>
                <span className="font-bold text-destructive">{t("WARNING.SECOND")}</span>
                {t("WARNING.THIRD")}
                <span className="font-bold text-destructive">{t("WARNING.FOURTH")}</span>
                {t("WARNING.FIFTH")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Section */}
      <Card className="border shadow-sm bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Change Password</h3>
              <p className="text-sm text-muted-foreground">
                Update your password to keep your account secure
              </p>
            </div>
          </div>
          <ChangePassword />
        </CardContent>
      </Card>
    </div>
  );
};
