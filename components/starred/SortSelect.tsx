"use client";

import { StarredItem } from "@/types/saved";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { useRouter } from "next-intl/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";
import { ArrowUpDown, Calendar, Clock, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  sortType: string | null;
  refetch: <TPageData>(
    //@ts-ignore
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<StarredItem[], unknown>>;
}

export const SortSelect = ({ sortType, refetch }: Props) => {
  const t = useTranslations("STARRED");
  const router = useRouter();
  const onSelectHandler = (type: "asc" | "desc") => {
    router.push(`/dashboard/starred/?sort=${type}`);
    refetch();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2"
    >
      <Select
        defaultValue={
          sortType === "asc" || sortType === "desc" ? sortType : "desc"
        }
        onValueChange={(field) => {
          onSelectHandler(field as "asc" | "desc");
        }}
      >
        <SelectTrigger className="w-[180px] bg-background/50 border-border/50 hover:bg-background transition-colors">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Sort by..." />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              <span>{t("SORT.DESC")}</span>
            </div>
          </SelectItem>
          <SelectItem value="asc" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4" />
              <span>{t("SORT.ASC")}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">{t("SORT.INFO")}</p>
    </motion.div>
  );
};
