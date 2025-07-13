"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Laptop, Moon, Sun } from "lucide-react";

interface Props {
  theme: "light" | "dark" | "system";
  activeTheme?: string;
  onTheme: (theme: string) => void;
}

export const ThemeCard = ({ theme, activeTheme, onTheme }: Props) => {
  return (
    <Card
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onTheme(theme);
        }
      }}
      onClick={() => onTheme(theme)}
      className={`${
        activeTheme === theme 
          ? "border-primary ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg" 
          : "border hover:border-primary/30 hover:shadow-lg"
      } w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg min-h-[280px] hover:scale-105 duration-300 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background group`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${
              activeTheme === theme 
                ? "bg-primary text-white" 
                : "bg-muted group-hover:bg-primary/10 group-hover:text-primary"
            } transition-colors duration-200`}>
              {theme === "light" && <Sun size={24} />}
              {theme === "dark" && <Moon size={24} />}
              {theme === "system" && <Laptop size={24} />}
            </div>
            <div>
              <CardTitle className="text-xl font-bold">
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {theme === "light" && "Bright and clean"}
                {theme === "dark" && "Easy on the eyes"}
                {theme === "system" && "Follows your OS"}
              </p>
            </div>
          </div>
          {activeTheme === theme && (
            <Badge className="bg-primary text-primary-foreground shadow-md">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Active
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <div className="relative h-32 rounded-xl overflow-hidden border-2 border-muted-foreground/10">
          {/* Theme Preview */}
          <div className={`h-full w-full ${
            theme === "light" 
              ? "bg-gradient-to-br from-white to-gray-50" 
              : theme === "dark" 
              ? "bg-gradient-to-br from-gray-900 to-gray-800" 
              : "bg-gradient-to-br from-blue-50 to-purple-50"
          }`}>
            <div className="p-4 h-full flex flex-col justify-between">
              {/* Mock window header */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  theme === "light" ? "bg-red-400" : "bg-red-500"
                }`}></div>
                <div className={`w-3 h-3 rounded-full ${
                  theme === "light" ? "bg-yellow-400" : "bg-yellow-500"
                }`}></div>
                <div className={`w-3 h-3 rounded-full ${
                  theme === "light" ? "bg-green-400" : "bg-green-500"
                }`}></div>
              </div>
              
              {/* Mock content */}
              <div className="space-y-2">
                <div className={`h-2 rounded ${
                  theme === "light" 
                    ? "bg-gray-300" 
                    : theme === "dark" 
                    ? "bg-gray-600" 
                    : "bg-primary/30"
                } w-3/4`}></div>
                <div className={`h-2 rounded ${
                  theme === "light" 
                    ? "bg-gray-200" 
                    : theme === "dark" 
                    ? "bg-gray-700" 
                    : "bg-primary/20"
                } w-1/2`}></div>
                <div className={`h-6 rounded ${
                  theme === "light" 
                    ? "bg-blue-500" 
                    : theme === "dark" 
                    ? "bg-blue-600" 
                    : "bg-primary"
                } w-20`}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
