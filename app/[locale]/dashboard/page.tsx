import { DashboardHeader } from "@/components/header/DashboardHeader";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { getWorkspaces, getUserAdminWorkspaces } from "@/lib/api";

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard");

  const [userWorkspaces, userAdminWorkspaces] = await Promise.all([
    getWorkspaces(session.user.id),
    getUserAdminWorkspaces(session.user.id),
  ]);

  return (
    <>
      <DashboardHeader />
      <main className="h-full w-full">
        <DashboardOverview
          userId={session.user.id}
          username={session.user.username!}
          name={session.user.name}
          surname={session.user.surname}
          userWorkspaces={userWorkspaces || []}
          userAdminWorkspaces={userAdminWorkspaces || []}
        />
      </main>
    </>
  );
};

export default Dashboard;
