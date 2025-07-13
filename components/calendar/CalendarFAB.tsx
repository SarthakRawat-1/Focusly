"use client";

import { motion } from "framer-motion";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddTaskShortcut } from "../addTaskShortCut/AddTaskShortcut";

interface Props {
  userId: string;
}

export const CalendarFAB = ({ userId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 0.5, 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border-0"
            >
              <Plus className="h-6 w-6" />
              <span className="sr-only">Add new task</span>
            </Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Quick Add Task
            </DialogTitle>
            <DialogDescription>
              Create a new task and schedule it on your calendar.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <AddTaskShortcut userId={userId} />
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};