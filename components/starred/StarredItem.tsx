"use client";

import { StarredItem as StarredItemType } from "@/types/saved";
import { useFormatter, useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { ReadOnlyEmoji } from "../common/ReadOnlyEmoji";
import { MoreHorizontal, Star, StarOff, Clock, User, Folder } from "lucide-react";
import { UserHoverInfo } from "../common/UserHoverInfoCard";
import { Button, buttonVariants } from "../ui/button";
import { useUnstarItem } from "@/hooks/useUnstarItem";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { StarSvg } from "../common/StarSvg";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

interface Props {
  item: StarredItemType;
  sortType: "asc" | "desc";
  userId: string;
  viewMode?: "grid" | "list";
}

export const StarredItem = ({
  item: {
    emoji,
    id,
    link,
    title,
    type,
    updated,
    workspaceName,
    itemId,
    workspaceId,
  },
  sortType,
  userId,
  viewMode = "list",
}: Props) => {
  const onUnstar = useUnstarItem({ id, itemId, sortType, type, userId });
  const format = useFormatter();
  const dateTime = new Date(updated.at);
  const now = new Date();

  const t = useTranslations("STARRED");
  const c = useTranslations("COMMON");

  const itemTypeSentence = useMemo(() => {
    return type === "mindMap"
      ? c("EDITED_ITEM_SENTENCE.MIND_MAP")
      : c("EDITED_ITEM_SENTENCE.TASK");
  }, [type]);

  const unstarHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    onUnstar();
  };

  if (viewMode === "grid") {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Link href={link}>
          <Card className="h-full bg-gradient-to-br from-background to-muted/20 border-border/50 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <ReadOnlyEmoji
                    className="h-12 w-12"
                    selectedEmoji={emoji}
                  />
                  <Badge 
                    variant={type === "task" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {type === "task" ? "Task" : "Mind Map"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={unstarHandler} className="cursor-pointer">
                        <StarOff className="h-4 w-4 mr-2" />
                        {t("UNSTAR")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {!title && type === "mindMap" && t("DEFAULT_NAME.MIND_MAP")}
                  {!title && type === "task" && t("DEFAULT_NAME.TASK")}
                  {title && title}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    <span className="truncate">{workspaceName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{format.relativeTime(dateTime, now)}</span>
                  </div>

                  {updated.by && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <UserHoverInfo className="px-0 text-sm" user={updated.by} />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={link}>
        <Card className="bg-gradient-to-r from-background to-muted/10 border-border/50 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="flex w-full justify-between sm:items-center pt-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full">
              <div className="relative">
                <ReadOnlyEmoji
                  className="sm:h-16 sm:w-16 h-12 w-12"
                  selectedEmoji={emoji}
                />
                <Badge 
                  variant={type === "task" ? "default" : "secondary"}
                  className="absolute -top-2 -right-2 text-xs h-5 px-1.5"
                >
                  {type === "task" ? "T" : "M"}
                </Badge>
              </div>
              
              <div className="w-full space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                    {!title && type === "mindMap" && t("DEFAULT_NAME.MIND_MAP")}
                    {!title && type === "task" && t("DEFAULT_NAME.TASK")}
                    {title && title}
                  </h2>
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Folder className="h-4 w-4" />
                      <Link
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "px-0 h-auto text-sm"
                        )}
                        href={`/dashboard/workspace/${workspaceId}`}
                      >
                        {workspaceName}
                      </Link>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{format.relativeTime(dateTime, now)}</span>
                    </div>
                  </div>

                  {updated.by && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{c("EDITED_ITEM_SENTENCE.BY")}</span>
                      <UserHoverInfo className="px-0" user={updated.by} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={unstarHandler} className="cursor-pointer">
                  <StarOff className="h-4 w-4 mr-2" />
                  {t("UNSTAR")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
