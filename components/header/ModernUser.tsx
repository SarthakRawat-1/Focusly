"use client";

import { Check, LogOut, Moon, Settings2, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { UserAvatar } from "../ui/user-avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  profileImage?: string | null;
  username: string;
  email: string;
}

export const ModernUser = ({ profileImage, username, email }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Button
            variant="ghost"
            className="h-9 w-9 rounded-full hover:bg-primary/10 transition-all duration-200 p-0 overflow-hidden"
          >
            <UserAvatar
              profileImage={profileImage}
              username={username}
              className="h-full w-full"
              size={16}
            />
          </Button>
          <div className="absolute -bottom-0.5 -right-0.5">
            <div className="h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
          </div>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-64 p-2 shadow-lg border-border/50"
        sideOffset={8}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* User Info */}
          <DropdownMenuLabel className="p-3 pb-2">
            <div className="flex items-center gap-3">
              <UserAvatar
                profileImage={profileImage}
                username={username}
                className="h-10 w-10"
                size={18}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{username}</p>
                <p className="text-xs text-muted-foreground truncate">{email}</p>
                <Badge variant="secondary" className="text-xs h-4 px-1.5 mt-1">
                  Online
                </Badge>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Theme Toggle */}
          <div className="px-1 py-1">
            <p className="text-xs font-medium text-muted-foreground px-2 py-1">
              Appearance
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant={theme === "light" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTheme("light")}
                className="flex-1 justify-start h-8"
              >
                <Sun className="h-3 w-3 mr-2" />
                <span className="text-xs">Light</span>
                {theme === "light" && <Check className="h-3 w-3 ml-auto" />}
              </Button>
              <Button
                variant={theme === "dark" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex-1 justify-start h-8"
              >
                <Moon className="h-3 w-3 mr-2" />
                <span className="text-xs">Dark</span>
                {theme === "dark" && <Check className="h-3 w-3 ml-auto" />}
              </Button>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Settings */}
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard/settings" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Logout */}
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};