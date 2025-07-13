"use client";

import { CalendarItem } from "@/types/extended";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, TrendingUp, CheckCircle, Grid3X3 } from "lucide-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useMemo } from "react";
import { CustomColors } from "@prisma/client";

dayjs.extend(isBetween);

interface Props {
  calendarItems: CalendarItem[];
  monthIndex: number;
}

export const CalendarSidebar = ({ calendarItems, monthIndex }: Props) => {
  const stats = useMemo(() => {
    const currentMonth = dayjs().month(monthIndex);
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    
    const monthTasks = calendarItems.filter(item => {
      if (!item.taskDate?.from) return false;
      const taskDate = dayjs(item.taskDate.from);
      return taskDate.isBetween(startOfMonth, endOfMonth, 'day', '[]');
    });

    const todayTasks = calendarItems.filter(item => {
      if (!item.taskDate?.from) return false;
      return dayjs(item.taskDate.from).isSame(dayjs(), 'day');
    });

    const upcomingTasks = calendarItems.filter(item => {
      if (!item.taskDate?.from) return false;
      const taskDate = dayjs(item.taskDate.from);
      const today = dayjs();
      const nextWeek = today.add(7, 'days');
      return taskDate.isAfter(today, 'day') && taskDate.isBefore(nextWeek, 'day');
    });

    const workspaceStats = calendarItems.reduce((acc, item) => {
      const workspace = item.workspaceName;
      if (!acc[workspace]) {
        acc[workspace] = { count: 0, color: item.workspaceColor };
      }
      acc[workspace].count++;
      return acc;
    }, {} as Record<string, { count: number; color: CustomColors }>);

    return {
      total: monthTasks.length,
      today: todayTasks.length,
      upcoming: upcomingTasks.length,
      workspaces: Object.entries(workspaceStats).slice(0, 5)
    };
  }, [calendarItems, monthIndex]);

  const getColorClass = (color: CustomColors) => {
    switch (color) {
      case CustomColors.PURPLE: return "bg-purple-500";
      case CustomColors.GREEN: return "bg-green-500";
      case CustomColors.RED: return "bg-red-500";
      case CustomColors.BLUE: return "bg-blue-500";
      case CustomColors.CYAN: return "bg-cyan-500";
      case CustomColors.EMERALD: return "bg-emerald-500";
      case CustomColors.INDIGO: return "bg-indigo-500";
      case CustomColors.LIME: return "bg-lime-500";
      case CustomColors.ORANGE: return "bg-orange-500";
      case CustomColors.FUCHSIA: return "bg-fuchsia-500";
      case CustomColors.PINK: return "bg-pink-500";
      case CustomColors.YELLOW: return "bg-yellow-500";
      default: return "bg-primary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">This Month</span>
                </div>
                <Badge variant="secondary">{stats.total}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Today</span>
                </div>
                <Badge variant={stats.today > 0 ? "default" : "secondary"}>
                  {stats.today}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Next 7 Days</span>
                </div>
                <Badge variant={stats.upcoming > 0 ? "default" : "secondary"}>
                  {stats.upcoming}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Workspace Breakdown */}
      {stats.workspaces.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Grid3X3 className="h-5 w-5 text-primary" />
                By Workspace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.workspaces.map(([workspace, data], index) => (
                  <motion.div
                    key={workspace}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getColorClass(data.color)}`} />
                      <span className="text-sm font-medium truncate max-w-[120px]">
                        {workspace}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {data.count}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Mini Calendar Navigation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Quick Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                {dayjs().month(monthIndex).format('MMMM YYYY')}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-xs font-medium text-muted-foreground p-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = dayjs().month(monthIndex).startOf('month').startOf('week').add(i, 'day');
                  const isCurrentMonth = date.month() === monthIndex;
                  const isToday = date.isSame(dayjs(), 'day');
                  const hasTasks = calendarItems.some(item => 
                    item.taskDate?.from && dayjs(item.taskDate.from).isSame(date, 'day')
                  );
                  
                  return (
                    <div
                      key={i}
                      className={`
                        text-xs p-1 text-center rounded cursor-pointer transition-all
                        ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50'}
                        ${isToday ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-muted'}
                        ${hasTasks ? 'ring-1 ring-primary/30' : ''}
                      `}
                    >
                      {date.format('D')}
                      {hasTasks && (
                        <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};