"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { AssignedToMeItem } from "./AssignedToMeItem";
import { AssignedToMeDataItem } from "@/types/extended";
import { LoadingScreen } from "../common/LoadingScreen";
import { ClientError } from "../error/ClientError";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { User, Filter, Grid, List, Search, Users, Briefcase, Brain } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { AssignedToMeSkeleton } from "./AssignedToMeSkeleton";
import { AssignedToMeSearch } from "./AssignedToMeSearch";
import { NoAssignedItems } from "./NoAssignedItems";

interface Props {
  userId: string;
}

export const AssignedToMeContainer = ({ userId }: Props) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filterType, setFilterType] = useState<"all" | "tasks" | "mind-maps">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const m = useTranslations("MESSAGES");
  const t = useTranslations("ASSIGNED_TO_ME");

  const {
    data: assignedInfo,
    isLoading,
    isError,
    error,
  } = useQuery<AssignedToMeDataItem[], Error>({
    queryFn: async () => {
      const res = await fetch(
        `/api/assigned_to/get?workspace=all&type=all&userId=${userId}`
      );

      if (!res.ok) {
        const error = (await res.json()) as string;
        throw new Error(error);
      }

      const data = await res.json();
      return data;
    },
    queryKey: ["getAssignedToMeInfo", userId],
  });

  const filteredItems = assignedInfo?.filter(item => {
    // Filter by type
    const typeMatch = filterType === "all" ? true : 
      filterType === "tasks" ? item.type === "task" :
      filterType === "mind-maps" ? item.type === "mindMap" : true;
    
    // Filter by search query
    const searchMatch = searchQuery === "" ? true : 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.workspaceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return typeMatch && searchMatch;
  });

  const taskCount = assignedInfo?.filter(item => item.type === "task").length || 0;
  const mindMapCount = assignedInfo?.filter(item => item.type === "mindMap").length || 0;
  const workspaceCount = new Set(assignedInfo?.map(item => item.workspaceId)).size || 0;

  if (isLoading) return <AssignedToMeSkeleton />;

  if (isError) {
    return (
      <ClientError
        message={m(error.message)}
        hrefToGoOnReset="/dashboard/assigned-to-me"
      />
    );
  }

  if (assignedInfo?.length === 0) return <NoAssignedItems />;

  // Show empty search results
  if (filteredItems?.length === 0 && (searchQuery || filterType !== "all")) {
    return (
      <div className="space-y-6">
        {/* Header with search */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-xl border border-blue-400/30">
                <User className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {t("TITLE")}
                </h1>
                <p className="text-muted-foreground mt-1">{t("DESC")}</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              <AssignedToMeSearch 
                onSearch={setSearchQuery}
                placeholder="Search assigned items..."
                showResultsCount={true}
                resultsCount={filteredItems?.length || 0}
                totalCount={assignedInfo?.length || 0}
              />
            </div>
          </div>
        </motion.div>

        {/* Empty search results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16 text-center space-y-4"
        >
          <div className="p-4 bg-muted/50 rounded-full">
            <Filter className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">No items found</h3>
            <p className="text-muted-foreground max-w-md">
              {searchQuery 
                ? `No assigned items match "${searchQuery}"`
                : `No ${filterType === "all" ? "" : filterType.replace("-", " ")} found`
              }
            </p>
          </div>
          <div className="flex gap-2">
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            )}
            {filterType !== "all" && (
              <Button variant="outline" onClick={() => setFilterType("all")}>
                Show all items
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-xl border border-blue-400/30">
              <User className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t("TITLE")}
              </h1>
              <p className="text-muted-foreground mt-1">{t("DESC")}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {filteredItems?.length} of {assignedInfo?.length} items
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {taskCount} tasks
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {mindMapCount} mind maps
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {workspaceCount} workspaces
                </Badge>
                {(searchQuery || filterType !== "all") && (
                  <Badge variant="destructive" className="text-xs">
                    Filtered
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            {/* Search */}
            <AssignedToMeSearch 
              onSearch={setSearchQuery}
              placeholder="Search assigned items..."
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter Buttons */}
              <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1 border border-border/30">
                <Button
                  variant={filterType === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                  className="text-xs"
                >
                  <Users className="h-3 w-3 mr-1" />
                  All
                </Button>
                <Button
                  variant={filterType === "tasks" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilterType("tasks")}
                  className="text-xs"
                >
                  <Briefcase className="h-3 w-3 mr-1" />
                  Tasks
                </Button>
                <Button
                  variant={filterType === "mind-maps" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilterType("mind-maps")}
                  className="text-xs"
                >
                  <Brain className="h-3 w-3 mr-1" />
                  Mind Maps
                </Button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1 border border-border/30">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Items Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${filterType}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredItems?.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <AssignedToMeItem 
                  info={info} 
                  viewMode={viewMode}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
