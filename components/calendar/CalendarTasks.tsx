"use client";

import { CalendarItem } from "@/types/extended";
import { useMemo } from "react";
import { CalendarTask } from "./CalendarTask";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ShowMore } from "./ShowMore";
import { useMediaQuery } from "@react-hook/media-query";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  calendarItems: CalendarItem[];
}

export const CalendarTasks = ({ calendarItems }: Props) => {
  const visibleItems = useMemo(() => {
    return calendarItems.slice(0, 3);
  }, [calendarItems]);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  if (isSmallScreen) {
    return (
      <div className="relative flex flex-col items-center justify-center h-full">
        <AnimatePresence>
          {calendarItems.length >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <ShowMore
                small
                leftItemsAmount={calendarItems.length}
                calendarItems={calendarItems}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  } else {
    const maxVisible = isMediumScreen ? 2 : 3;
    const displayItems = calendarItems.slice(0, maxVisible);
    
    return (
      <div className="w-full h-full">
        <AnimatePresence mode="popLayout">
          <div className="flex flex-col gap-2 h-full">
            {displayItems.map((calendarItem, index) => (
              <motion.div
                key={calendarItem.taskId}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ 
                  duration: 0.2, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                layout
              >
                <CalendarTask dayInfo={calendarItem} />
              </motion.div>
            ))}
            
            {calendarItems.length > maxVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: displayItems.length * 0.05 }}
              >
                <ShowMore
                  leftItemsAmount={calendarItems.length - maxVisible}
                  calendarItems={calendarItems}
                />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
    );
  }
};
