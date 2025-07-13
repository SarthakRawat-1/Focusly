"use client";

import { getMonth } from "@/lib/utils";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { useQuery } from "@tanstack/react-query";
import { CalendarItem } from "@/types/extended";
import { LoadingScreen } from "../common/LoadingScreen";
import { ClientError } from "../error/ClientError";
import { CalendarSkeleton } from "./CalendarSkeleton";
import { Card } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarSidebar } from "./CalendarSidebar";
import { CalendarFAB } from "./CalendarFAB";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { BarChart3 } from "lucide-react";

interface Props {
  userId: string;
}

export const Calendar = ({ userId }: Props) => {
  const [currMonth, setCurrMonth] = useState(getMonth());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const changeMonthHandler = useCallback((change: "next" | "prev") => {
    setDirection(change === "next" ? 1 : -1);
    if (change === "next") setMonthIndex((prev) => prev + 1);
    else setMonthIndex((prev) => prev - 1);
  }, []);

  const resetMonthHandler = useCallback(() => {
    if (monthIndex === dayjs().month()) return;
    setDirection(0);
    setMonthIndex(dayjs().month());
  }, [monthIndex]);

  const {
    data: calendarItems,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const res = await fetch(`/api/calendar/get?userId=${userId}`);

      if (!res.ok) throw new Error();

      const data = (await res.json()) as CalendarItem[];
      return data;
    },
    queryKey: ["getCalendarItems", userId],
  });

  if (isLoading) return <CalendarSkeleton />;

  if (isError)
    return (
      <ClientError hrefToGoOnReset="/dashboard/calendar" message={"error"} />
    );

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-6">
        <div className="relative">
          <CalendarHeader
            monthIndex={monthIndex}
            onChangeMonthHandler={changeMonthHandler}
            onResetMonthHandler={resetMonthHandler}
          />
          
          {/* Mobile Sidebar Trigger */}
          <div className="absolute top-4 right-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="shadow-lg"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Stats
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Calendar Overview</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CalendarSidebar 
                    calendarItems={calendarItems!}
                    monthIndex={monthIndex}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex-1 flex gap-6">
          {/* Main Calendar */}
          <Card className="flex-1 p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={monthIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full h-full"
              >
                <CalendarGrid
                  currMonth={currMonth}
                  monthIndex={monthIndex}
                  calendarItems={calendarItems!}
                />
              </motion.div>
            </AnimatePresence>
          </Card>

          {/* Desktop Sidebar */}
          <div className="w-80 hidden lg:block">
            <CalendarSidebar 
              calendarItems={calendarItems!}
              monthIndex={monthIndex}
            />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <CalendarFAB userId={userId} />
    </>
  );
};
