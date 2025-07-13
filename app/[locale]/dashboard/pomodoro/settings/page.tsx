import { DashboardHeader } from "@/components/header/DashboardHeader";
import { SettingsContainer } from "@/components/pomodoro/SettingsContainer";
import { getUserPomodoroSettings } from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { AddTaskShortcut } from "@/components/addTaskShortCut/AddTaskShortcut";

const PomodoroSettings = async () => {
  const session = await checkIfUserCompletedOnboarding(`/dashboard/pomodoro`);

  const pomodoroSettings = await getUserPomodoroSettings(session.user.id);

  return (
    <>
      <DashboardHeader>
        <AddTaskShortcut userId={session.user.id} />
      </DashboardHeader>
      <main className="max-w-4xl mx-auto space-y-8">
        <SettingsContainer pomodoroSettings={pomodoroSettings} />
      </main>
    </>
  );
};

export default PomodoroSettings;
