"use client";

import { motion } from "framer-motion";
import { Clock, Settings, Timer, BarChart3, Target } from "lucide-react";
import ActiveLink from "@/components/ui/active-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ModernPomodoroLinks = () => {
  
  return (
    <div className="space-y-4">
      {/* Pomodoro Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Timer className="h-4 w-4 text-primary" />
              Pomodoro Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ActiveLink
              href="/dashboard/pomodoro"
              variant="ghost"
              size="sm"
              className="w-full justify-start h-9"
            >
              <div className="flex items-center gap-3">
                <div className="p-1 bg-red-500/10 rounded border border-red-500/20">
                  <Clock className="h-3 w-3 text-red-600" />
                </div>
                <span className="text-sm font-medium">Timer</span>
              </div>
            </ActiveLink>
            
            <ActiveLink
              href="/dashboard/pomodoro/settings"
              variant="ghost"
              size="sm"
              className="w-full justify-start h-9"
            >
              <div className="flex items-center gap-3">
                <div className="p-1 bg-blue-500/10 rounded border border-blue-500/20">
                  <Settings className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Settings</span>
              </div>
            </ActiveLink>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pomodoro Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Focus Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs mt-0.5">
                  1
                </Badge>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Work for 25 minutes with full focus
                </p>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs mt-0.5">
                  2
                </Badge>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Take a 5-minute break
                </p>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs mt-0.5">
                  3
                </Badge>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  After 4 cycles, take a longer break
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats - Placeholder for future implementation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Sessions</span>
                <Badge variant="secondary" className="text-xs">
                  0/4
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Focus Time</span>
                <Badge variant="secondary" className="text-xs">
                  0h 0m
                </Badge>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 mt-3">
                <div className="bg-primary h-2 rounded-full w-0 transition-all duration-300"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};