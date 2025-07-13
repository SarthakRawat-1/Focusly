"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { useQuery } from "@tanstack/react-query";

import { StarredItem as StarredItemType } from "@/types/saved";
import { LoadingScreen } from "../common/LoadingScreen";
import { StarredItem } from "./StarredItem";
import { SortSelect } from "./SortSelect";
import { NoStarredItems } from "./NoStarredItems";
import { useTranslations } from "next-intl";
import { ClientError } from "../error/ClientError";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Filter, Grid, List } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { StarredSkeleton } from "./StarredSkeleton";
import { StarredSearch } from "./StarredSearch";

interface Props {
  userId: string;
}

export const StarredContainer = ({ userId }: Props) => {
  const params = useSearchParams();
  const sortParam = params.get("sort");
  const sortType = sortParam && sortParam === "desc" ? "desc" : "asc";
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filterType, setFilterType] = useState<"all" | "task" | "mindMap">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const t = useTranslations("STARRED");

  const {
    data: starredItems,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `/api/saved/get?userId=${userId}&sort=${sortType}`
      );

      if (!res.ok) throw new Error();

      const data = (await res.json()) as StarredItemType[];
      return data;
    },
    queryKey: ["getStarredItems", userId, sortType],
  });

  const filteredItems = starredItems?.filter(item => {
    // Filter by type
    const typeMatch = filterType === "all" ? true : item.type === filterType;
    
    // Filter by search query
    const searchMatch = searchQuery === "" ? true : 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.workspaceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return typeMatch && searchMatch;
  });

  const taskCount = starredItems?.filter(item => item.type === "task").length || 0;
  const mindMapCount = starredItems?.filter(item => item.type === "mindMap").length || 0;

  if (isLoading) return <StarredSkeleton />;

  if (isError) return <ClientError message={t("ERROR")} />;

  if (starredItems?.length === 0) return <NoStarredItems />;

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
              <div className="p-3 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl border border-yellow-400/30">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {t("TITLE")}
                </h1>
                <p className="text-muted-foreground mt-1">{t("DESC")}</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              <StarredSearch 
                onSearch={setSearchQuery}
                placeholder="Search starred items..."
                showResultsCount={true}
                resultsCount={filteredItems?.length || 0}
                totalCount={starredItems?.length || 0}
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
                ? `No starred items match "${searchQuery}"`
                : `No ${filterType === "all" ? "" : filterType} items found`
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
            <div className="p-3 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl border border-yellow-400/30">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t("TITLE")}
              </h1>
              <p className="text-muted-foreground mt-1">{t("DESC")}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {filteredItems?.length} of {starredItems?.length} items
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {taskCount} tasks
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {mindMapCount} mind maps
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
            <StarredSearch 
              onSearch={setSearchQuery}
              placeholder="Search starred items..."
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
                All
              </Button>
              <Button
                variant={filterType === "task" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType("task")}
                className="text-xs"
              >
                Tasks
              </Button>
              <Button
                variant={filterType === "mindMap" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType("mindMap")}
                className="text-xs"
              >
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

            {/* Sort Select */}
            <SortSelect sortType={sortType} refetch={refetch} />
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
            {filteredItems?.map((starredItem, index) => (
              <motion.div
                key={starredItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <StarredItem
                  item={starredItem}
                  sortType={sortType}
                  userId={userId}
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
