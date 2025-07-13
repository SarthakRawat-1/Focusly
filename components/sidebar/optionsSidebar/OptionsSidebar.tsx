"use client";

import { usePathname } from "next-intl/client";
import { Settings } from "./settingsOptions/Settings";
import { CreatedWorkspacesInfo } from "@/components/common/CreatedWorkspacesInfo";
import { Workspace } from "@prisma/client";
import { ModernWorkspaceOptions } from "./workspaceOptions/ModernWorkspaceOptions";
import { ModernPomodoroLinks } from "./pomodoro/ModernPomodoroLinks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface Props {
  createdWorkspaces: number;
  userAdminWorkspaces: Workspace[];
  userWorkspaces: Workspace[];
}

export const OptionsSidebar = ({
  createdWorkspaces,
  userAdminWorkspaces,
  userWorkspaces,
}: Props) => {
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;

  const urlWorkspaceId: string | undefined = pathname.split("/")[3];
  const urlAdditionalId: string | undefined = pathname.split("/")[6];
  const chatId: string | undefined = pathname.split("/")[5];
  const workspaceId = urlWorkspaceId ? urlWorkspaceId : "";

  if (
    pathname === "/dashboard" ||
    pathname === "/dashboard/starred" ||
    pathname === "/dashboard/calendar" ||
    pathname === "/dashboard/assigned-to-me" ||
    (urlAdditionalId &&
      pathname ===
        `/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}/edit`) ||
    (urlAdditionalId &&
      pathname ===
        `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}/edit`)
  ) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:w-72 w-64 h-full flex flex-col"
    >
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {pathname.includes("/dashboard/settings") && (
              <Settings userAdminWorkspaces={userAdminWorkspaces} />
            )}
            
            {(pathname === `/dashboard/workspace/${workspaceId}` ||
              pathname ===
                `/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}` ||
              pathname ===
                `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}` ||
              pathname ===
                `/dashboard/workspace/${workspaceId}/chat/${chatId}`) && (
              <ModernWorkspaceOptions workspaceId={workspaceId} />
            )}

            {(pathname === "/dashboard/pomodoro" ||
              pathname === "/dashboard/pomodoro/settings") && (
              <ModernPomodoroLinks />
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer with workspace info */}
      <div className="border-t border-border/50 p-4">
        <CreatedWorkspacesInfo createdNumber={createdWorkspaces} />
      </div>
    </motion.div>
  );
};
