import { CalendarItem } from "@/types/extended";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { CalendarTask } from "./CalendarTask";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "../ui/badge";

interface Props {
  calendarItems: CalendarItem[];
  leftItemsAmount: number;
  small?: boolean;
}

export const ShowMore = ({ calendarItems, leftItemsAmount, small }: Props) => {
  const t = useTranslations("CALENDAR.SHOW_MORE");
  const displayCount = leftItemsAmount > 9 ? "9+" : leftItemsAmount.toString();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {small ? (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="relative bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 text-primary hover:bg-primary/20 w-8 h-8 rounded-full shadow-lg backdrop-blur-sm"
              size="icon"
              variant="ghost"
            >
              <span className="text-xs font-bold">{displayCount}</span>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
              />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full h-8 text-xs bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50 hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all duration-200"
              size="sm"
              variant="ghost"
            >
              <Plus className="h-3 w-3 mr-1" />
              {displayCount} {t("MORE")}
            </Button>
          </motion.div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">{t("TITLE")}</DialogTitle>
              <DialogDescription className="text-sm">
                {t("DESC")}
              </DialogDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {calendarItems.length} {calendarItems.length === 1 ? 'task' : 'tasks'}
            </Badge>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-96 pr-4">
          <div className="space-y-3">
            <AnimatePresence>
              {calendarItems.map((calendarItem, index) => (
                <motion.div
                  key={calendarItem.taskId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                >
                  <CalendarTask
                    dayInfo={calendarItem}
                    showMore
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
