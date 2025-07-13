"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingState } from "@/components/ui/loadingState";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeCard } from "./ThemeCard";

export const Theme = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
        <LoadingState className="w-12 h-12" />
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2M9 3h6a2 2 0 012 2v12a4 4 0 01-4 4H9"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Theme</h1>
            <p className="text-muted-foreground text-lg">
              Select how you would like your interface to look. Choose from dark, light or system.
            </p>
          </div>
        </div>
      </div>

      {/* Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
        <ThemeCard onTheme={setTheme} theme="light" activeTheme={theme} />
        <ThemeCard onTheme={setTheme} theme="dark" activeTheme={theme} />
        <ThemeCard onTheme={setTheme} theme="system" activeTheme={theme} />
      </div>
    </div>
  );
};
