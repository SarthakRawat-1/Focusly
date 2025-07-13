"use client";

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CalendarSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header Skeleton */}
      <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1 border border-border/30">
            <Skeleton className="h-9 w-9 rounded" />
            <Skeleton className="h-9 w-16 rounded" />
            <Skeleton className="h-9 w-9 rounded" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        {/* Main Calendar Skeleton */}
        <Card className="flex-1 p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <div className="w-full h-full flex flex-col gap-4">
            {/* Days of week header */}
            <div className="w-full grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>

            {/* Calendar grid */}
            <div className="w-full flex-1 grid grid-cols-7 grid-rows-5 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} className="h-full min-h-[120px] rounded-lg" />
              ))}
            </div>
          </div>
        </Card>

        {/* Sidebar Skeleton */}
        <div className="w-80 hidden lg:block space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-5 w-8 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-28 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-3 h-3 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-5 w-6 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-36 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-6 rounded" />
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-6 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};