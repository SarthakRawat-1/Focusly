import { PomodoroSettings } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { SettingsForm } from "./SettingsForm";
import { useTranslations } from "next-intl";

interface Props {
  pomodoroSettings: PomodoroSettings;
}

export const SettingsContainer = ({ pomodoroSettings }: Props) => {
  const t = useTranslations("POMODORO.SETTINGS.CARD");
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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

      {/* Settings Card */}
      <Card className="border shadow-sm bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <SettingsForm pomodoroSettings={pomodoroSettings} />
        </CardContent>
      </Card>
    </div>
  );
};
