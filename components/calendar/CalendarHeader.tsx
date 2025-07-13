"use client";

import { useFormatter, useTranslations } from "next-intl";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface Props {
  monthIndex: number;
  onResetMonthHandler: () => void;
  onChangeMonthHandler: (change: "next" | "prev") => void;
}

export const CalendarHeader = ({
  monthIndex,
  onChangeMonthHandler,
  onResetMonthHandler,
}: Props) => {
  const format = useFormatter();

  const dateTime = new Date(dayjs().year(), monthIndex);
  const isCurrentMonth = monthIndex === dayjs().month();

  const year = format.dateTime(dateTime, {
    year: "numeric",
  });

  const month = format.dateTime(dateTime, {
    month: "long",
  });
  const t = useTranslations("CALENDAR.HEADER");
  
  return (
    <motion.div 
      className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <CalendarIcon className="h-8 w-8 text-primary" />
        <div>
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            key={`${month}-${year}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {month} {year}
          </motion.h1>
          {isCurrentMonth && (
            <Badge variant="secondary" className="mt-1 text-xs">
              Current Month
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1 border border-border/30">
        <Button
          onClick={() => onChangeMonthHandler("prev")}
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-primary/10 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t("PREV")}</span>
        </Button>
        
        <Button
          onClick={onResetMonthHandler}
          variant={isCurrentMonth ? "default" : "ghost"}
          size="sm"
          className="px-4 h-9 text-sm font-medium transition-all hover:scale-105"
          disabled={isCurrentMonth}
        >
          {t("TODAY")}
        </Button>
        
        <Button
          onClick={() => onChangeMonthHandler("next")}
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-primary/10 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">{t("NEXT")}</span>
        </Button>
      </div>
    </motion.div>
  );
};
