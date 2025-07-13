"use client";

import { useState, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
  showResultsCount?: boolean;
  resultsCount?: number;
  totalCount?: number;
}

export const AssignedToMeSearch = ({ 
  onSearch, 
  placeholder = "Search assigned items...", 
  showResultsCount = false,
  resultsCount = 0,
  totalCount = 0 
}: Props) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search to improve performance
  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 300);

  const handleSearch = (value: string) => {
    setQuery(value);
    debouncedSearch(value);
  };

  // Clear debounced callback on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-md"
    >
      <div className={`
        relative flex items-center transition-all duration-200
        ${isFocused ? 'scale-105' : 'scale-100'}
      `}>
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground z-10" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            pl-10 pr-10 bg-background/50 border-border/50 
            focus:bg-background focus:border-primary/50 transition-all duration-200
            ${isFocused ? 'shadow-lg' : 'shadow-sm'}
          `}
        />
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-2"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-6 w-6 p-0 hover:bg-muted rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Search results info */}
      <AnimatePresence>
        {query && showResultsCount && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 right-0 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg z-20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Searching for "{query}"
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {resultsCount} of {totalCount}
              </Badge>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};