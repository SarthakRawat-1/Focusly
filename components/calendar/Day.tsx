import { cn } from "@/lib/utils";
import { CalendarItem } from "@/types/extended";
import dayjs, { Dayjs } from "dayjs";
import { CalendarTask } from "./CalendarTask";
import { CalendarTasks } from "./CalendarTasks";
import isSameOArfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
dayjs.extend(isSameOArfter);
dayjs.extend(isSameOrBefore);

interface Props {
  day: Dayjs;
  monthIndex: number;
  calendarItems: CalendarItem[];
}

export const Day = ({ day, monthIndex, calendarItems }: Props) => {
  const isPreviousMonth = day.month() !== monthIndex;
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  const isWeekend = day.format("ddd") === "Sat" || day.format("ddd") === "Sun";
  const [tasks, setTasks] = useState<CalendarItem[]>([]);

  useEffect(() => {
    const filterTasks = calendarItems.filter((dayInfo, i) => {
      const startDate = dayjs(dayInfo.taskDate?.from);
      const endDate = dayInfo.taskDate?.to ? dayjs(dayInfo.taskDate?.to) : null;

      if (startDate.isSame(day) && !endDate) return dayInfo;
      else if (day.isSameOrAfter(startDate) && day.isSameOrBefore(endDate)) {
        return dayInfo;
      }
    });

    setTasks(filterTasks);
  }, [day, calendarItems]);

  return (
    <motion.div
      className={cn(
        "relative h-full min-h-[120px] flex flex-col rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer",
        {
          "bg-gradient-to-br from-background to-muted/20 border-border/50": !isPreviousMonth,
          "bg-muted/30 border-border/30 opacity-60": isPreviousMonth,
          "bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30": isWeekend && !isPreviousMonth,
          "ring-2 ring-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30": isToday,
        }
      )}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Day number */}
      <div className="flex justify-between items-start p-3 pb-2">
        <motion.div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-200",
            {
              "bg-primary text-primary-foreground shadow-lg": isToday,
              "text-muted-foreground": isPreviousMonth,
              "text-foreground hover:bg-muted": !isToday && !isPreviousMonth,
            }
          )}
          whileHover={!isToday ? { scale: 1.1 } : {}}
        >
          {day.format("DD")}
        </motion.div>
        
        {tasks.length > 0 && (
          <Badge 
            variant="secondary" 
            className="text-xs h-5 px-1.5 bg-primary/10 text-primary border-primary/20"
          >
            {tasks.length}
          </Badge>
        )}
      </div>

      {/* Tasks container */}
      <div className="flex-1 px-3 pb-3">
        <CalendarTasks calendarItems={tasks} />
      </div>

      {/* Today indicator */}
      {isToday && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
        />
      )}
    </motion.div>
  );
};
