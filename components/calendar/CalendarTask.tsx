"use client";

import { CalendarItem } from "@/types/extended";
import { useMemo } from "react";
import { CustomColors } from "@prisma/client";
import dayjs from "dayjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "../ui/badge";

interface Props {
  dayInfo: CalendarItem;
  showMore?: boolean;
}

export const CalendarTask = ({
  dayInfo: {
    taskDate,
    taskId,
    title,
    workspaceColor,
    workspaceId,
    workspaceName,
  },
  showMore,
}: Props) => {
  const colorClasses = useMemo(() => {
    const baseClasses = "shadow-sm border border-opacity-20";
    switch (workspaceColor) {
      case CustomColors.PURPLE:
        return `${baseClasses} bg-purple-500/90 hover:bg-purple-500 border-purple-300 text-white`;
      case CustomColors.GREEN:
        return `${baseClasses} bg-green-500/90 hover:bg-green-500 border-green-300 text-white`;
      case CustomColors.RED:
        return `${baseClasses} bg-red-500/90 hover:bg-red-500 border-red-300 text-white`;
      case CustomColors.BLUE:
        return `${baseClasses} bg-blue-500/90 hover:bg-blue-500 border-blue-300 text-white`;
      case CustomColors.CYAN:
        return `${baseClasses} bg-cyan-500/90 hover:bg-cyan-500 border-cyan-300 text-white`;
      case CustomColors.EMERALD:
        return `${baseClasses} bg-emerald-500/90 hover:bg-emerald-500 border-emerald-300 text-white`;
      case CustomColors.INDIGO:
        return `${baseClasses} bg-indigo-500/90 hover:bg-indigo-500 border-indigo-300 text-white`;
      case CustomColors.LIME:
        return `${baseClasses} bg-lime-500/90 hover:bg-lime-500 border-lime-300 text-white`;
      case CustomColors.ORANGE:
        return `${baseClasses} bg-orange-500/90 hover:bg-orange-500 border-orange-300 text-white`;
      case CustomColors.FUCHSIA:
        return `${baseClasses} bg-fuchsia-500/90 hover:bg-fuchsia-500 border-fuchsia-300 text-white`;
      case CustomColors.PINK:
        return `${baseClasses} bg-pink-500/90 hover:bg-pink-500 border-pink-300 text-white`;
      case CustomColors.YELLOW:
        return `${baseClasses} bg-yellow-500/90 hover:bg-yellow-500 border-yellow-300 text-black`;
      default:
        return `${baseClasses} bg-primary/90 hover:bg-primary border-primary/30 text-primary-foreground`;
    }
  }, [workspaceColor]);

  const t = useTranslations("CALENDAR");

  const isMultiDay = taskDate?.from && taskDate?.to && 
    !dayjs(taskDate.from).isSame(dayjs(taskDate.to), 'day');

  return (
    <HoverCard openDelay={300} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Link href={`/dashboard/workspace/${workspaceId}/tasks/task/${taskId}`}>
          <motion.div
            className={`
              rounded-lg transition-all duration-200 cursor-pointer overflow-hidden backdrop-blur-sm
              ${colorClasses}
              ${showMore ? "py-3 px-4 min-h-[3rem]" : "py-2 px-3 min-h-[2.5rem]"}
            `}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${showMore ? "text-sm" : "text-xs"}`}>
                  {title || t("TASK")}
                </p>
                {showMore && (
                  <p className="text-xs opacity-80 truncate mt-1">
                    {workspaceName}
                  </p>
                )}
              </div>
              
              {isMultiDay && (
                <CalendarIcon className="h-3 w-3 opacity-70 flex-shrink-0" />
              )}
            </div>
          </motion.div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top" sideOffset={8}>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm">
              {title || t("TASK")}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              {workspaceName}
            </p>
          </div>
          
          {taskDate && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                {taskDate.from && dayjs(taskDate.from).format("MMM DD")}
                {taskDate.to && taskDate.from !== taskDate.to && 
                  ` - ${dayjs(taskDate.to).format("MMM DD")}`
                }
              </span>
            </div>
          )}
          
          <Badge variant="outline" className="text-xs">
            Click to view task
          </Badge>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
