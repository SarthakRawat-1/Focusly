"use client";

import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";

export const AssignedToMeSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div>
              <Skeleton className="h-8 w-56 mb-2" />
              <Skeleton className="h-4 w-72 mb-3" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-18 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Skeleton className="h-10 w-64" />
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1 border border-border/30">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1 border border-border/30">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Items Skeleton */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border rounded-lg bg-card"
          >
            <div className="flex w-full justify-between sm:items-center">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full">
                <div className="relative">
                  <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg" />
                  <Skeleton className="absolute -top-2 -right-2 h-5 w-5 rounded-full" />
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};