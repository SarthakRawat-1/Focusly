"use client";

import dayjs from "dayjs";
import { Fragment } from "react";
import { Day } from "./Day";
import { CalendarItem } from "@/types/extended";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface Props {
  currMonth: dayjs.Dayjs[][];
  monthIndex: number;
  calendarItems: CalendarItem[];
}

const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const CalendarGrid = ({
  currMonth,
  monthIndex,
  calendarItems,
}: Props) => {
  const t = useTranslations("CALENDAR.DAYS_OF_WEEK");

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Days of week header */}
      <div className="w-full grid grid-cols-7 gap-2">
        {daysOfWeek.map((day, index) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="text-center py-3 px-2 rounded-lg bg-muted/30 border border-border/20"
          >
            <p className="font-bold text-sm text-muted-foreground uppercase tracking-wider">
              {t(day)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="w-full flex-1 grid grid-cols-7 grid-rows-5 gap-2">
        {currMonth.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, idx) => (
              <motion.div
                key={day.format("DD-MM-YYYY")}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: (i * 7 + idx) * 0.02, 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <Day
                  monthIndex={monthIndex}
                  day={day}
                  calendarItems={calendarItems}
                />
              </motion.div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
