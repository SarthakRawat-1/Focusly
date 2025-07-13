"use client";

import { Workspace } from "@prisma/client";
import { motion } from "framer-motion";
import { useFormatter } from "next-intl";
import { 
  Home, 
  Calendar
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { DashboardStats } from "./DashboardStats";
import { DashboardWorkspaces } from "./DashboardWorkspaces";
import { DashboardRecentActivity } from "./DashboardRecentActivity";
import { DashboardQuickActions } from "./DashboardQuickActions";

interface Props {
  userId: string;
  username: string;
  name?: string | null;
  surname?: string | null;
  userWorkspaces: Workspace[];
  userAdminWorkspaces: Workspace[];
}

export const DashboardOverview = ({
  userId,
  username,
  name,
  surname,
  userWorkspaces,
  userAdminWorkspaces,
}: Props) => {
  const format = useFormatter();
  
  const dateTime = new Date();
  const day = format.dateTime(dateTime, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const displayName = name 
    ? name && surname 
      ? `${name} ${surname}` 
      : name 
    : username;

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border/50"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/20">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <motion.h1 
                    className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Welcome back, {displayName}!
                  </motion.h1>
                  <motion.p 
                    className="text-muted-foreground text-lg mt-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {day[0].toUpperCase() + day.slice(1)}
                  </motion.p>
                </div>
              </div>
              
              <motion.p 
                className="text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Here's an overview of your productivity workspace. Manage your tasks, 
                collaborate on mind maps, and stay organized across all your projects.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button variant="outline" asChild>
                <Link href="/dashboard/calendar">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <DashboardStats userId={userId} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Workspaces & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          <DashboardWorkspaces 
            userWorkspaces={userWorkspaces}
            userAdminWorkspaces={userAdminWorkspaces}
            userId={userId}
          />
          <DashboardQuickActions userId={userId} />
        </div>

        {/* Right Column - Recent Activity */}
        <div className="space-y-8">
          <DashboardRecentActivity userId={userId} />
        </div>
      </div>
    </div>
  );
};