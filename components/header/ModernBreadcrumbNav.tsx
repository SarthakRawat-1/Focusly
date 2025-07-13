"use client";

import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next-intl/client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const availableRoutesWithTranslation = [
  "dashboard",
  "settings",
  "security",
  "theme",
  "starred",
  "assigned-to-me",
  "calendar",
  "pomodoro",
];

interface Props {
  addManualRoutes?: {
    name: string;
    href: string;
    useTranslate?: boolean;
    emoji?: string;
  }[];
  workspaceHref?: string;
}

export const ModernBreadcrumbNav = ({ addManualRoutes, workspaceHref }: Props) => {
  const paths = usePathname();
  const pathNames = paths
    .split("/")
    .filter(
      (path) => path !== "te" && path !== "workspace" && path.trim() !== ""
    );

  const routeNames: Record<string, string> = {
    dashboard: "Dashboard",
    settings: "Settings", 
    security: "Security",
    theme: "Theme",
    starred: "Starred",
    "assigned-to-me": "Assigned to Me",
    calendar: "Calendar",
    pomodoro: "Pomodoro",
    workspace: "Workspace",
    tasks: "Tasks",
    task: "Task",
    "mind-maps": "Mind Maps",
    "mind-map": "Mind Map",
    chat: "Chat",
    edit: "Edit"
  };

  if (pathNames.length <= 1) return null;

  const renderBreadcrumbItem = (
    name: string,
    href: string,
    isLast: boolean,
    emoji?: string,
    useTranslate?: boolean
  ) => {
    const displayName = useTranslate ? routeNames[name] || name : name;
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        {!isLast ? (
          <>
            <Link
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-sm font-medium transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              {emoji && <span className="text-sm">{emoji}</span>}
              <span className="truncate max-w-[150px] sm:max-w-[200px]">
                {displayName}
              </span>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
          </>
        ) : (
          <div className="flex items-center gap-1.5 px-2 py-1">
            {emoji && <span className="text-sm">{emoji}</span>}
            <span className="text-sm font-semibold text-foreground truncate max-w-[150px] sm:max-w-[200px]">
              {displayName}
            </span>
            <Badge variant="secondary" className="text-xs h-5 px-1.5">
              Current
            </Badge>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <nav className="flex items-center gap-1 min-w-0" aria-label="Breadcrumb">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-md text-sm font-medium transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Home className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
      </motion.div>

      <div className="flex items-center gap-1 min-w-0 overflow-hidden">
        {addManualRoutes ? (
          addManualRoutes.map((route, i) =>
            renderBreadcrumbItem(
              route.name,
              route.href,
              i === addManualRoutes.length - 1,
              route.emoji,
              route.useTranslate
            )
          )
        ) : (
          pathNames.map((link, i) => {
            const href = `/${pathNames.slice(0, i + 1).join("/")}`;
            const isLast = i === pathNames.length - 1;
            const actualHref = workspaceHref && isLast ? workspaceHref : href;
            
            return renderBreadcrumbItem(
              link,
              actualHref,
              isLast,
              undefined,
              availableRoutesWithTranslation.includes(link)
            );
          })
        )}
      </div>
    </nav>
  );
};