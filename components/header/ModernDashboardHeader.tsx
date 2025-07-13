import { getAuthSession } from "@/lib/auth";
import { ModernBreadcrumbNav } from "./ModernBreadcrumbNav";
import { ModernUser } from "./ModernUser";
import Welcoming from "../common/Welcoming";
import { OpenSidebar } from "./OpenSidebar";
import { cn } from "@/lib/utils";
import { SavingStatus } from "./SavingStatus";
import { BackBtn } from "./BackBtn";
import { SimpleNotificationContainer } from "../notifications/SimpleNotificationContainer";

interface Props {
  addManualRoutes?: {
    name: string;
    href: string;
    useTranslate?: boolean;
    emoji?: string;
  }[];
  className?: string;
  children?: React.ReactNode;
  workspaceHref?: string;
  hideBreadCrumb?: boolean;
  showingSavingStatus?: boolean;
  showBackBtn?: boolean;
}

export const ModernDashboardHeader = async ({
  addManualRoutes,
  className,
  children,
  workspaceHref,
  hideBreadCrumb,
  showingSavingStatus,
  showBackBtn,
}: Props) => {
  const session = await getAuthSession();
  if (!session) return null;
  
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="flex w-full justify-between items-center px-4 py-3 gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <OpenSidebar />
          
          <Welcoming
            hideOnMobile
            hideOnDesktop
            username={session?.user.username!}
            name={session?.user.name}
            surname={session?.user.surname}
            showOnlyOnPath="/dashboard"
          />
          
          {showBackBtn && <BackBtn />}
          
          {showingSavingStatus && <SavingStatus />}
          
          {!hideBreadCrumb && (
            <div className="min-w-0 flex-1">
              <ModernBreadcrumbNav
                addManualRoutes={addManualRoutes}
                workspaceHref={workspaceHref}
              />
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-1">
            {children}
          </div>
          
          {/* Mobile Quick Actions */}
          <div className="flex sm:hidden items-center gap-1">
            {children}
          </div>

          {/* Notifications */}
          <SimpleNotificationContainer userId={session.user.id} />

          {/* User Profile */}
          <ModernUser
            profileImage={session?.user.image}
            username={session.user.username!}
            email={session.user.email!}
          />
        </div>
      </div>
    </header>
  );
};