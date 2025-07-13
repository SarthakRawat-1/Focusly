"use client";

import { ReadOnlyEmoji } from "@/components/common/ReadOnlyEmoji";
import { StarSvg } from "@/components/common/StarSvg";
import { UserHoverInfo } from "@/components/common/UserHoverInfoCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTruncateText } from "@/hooks/useTruncateText";
import { WorkspaceRecentActivity } from "@/types/extended";
import { useFormatter, useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Target, Brain } from "lucide-react";
import Link from "next/link";
import { TagItem } from "./TagItem";
import { AssignedToTaskUser } from "./AssignedToTaskUser";

interface Props {
  activity: WorkspaceRecentActivity;
  viewMode?: "grid" | "list";
}

export const RecentActivityItem = ({
  activity: { tags, title, emoji, starred, type, updated, assignedTo, link },
  viewMode = "list",
}: Props) => {
  const router = useRouter();

  const truncatedTitle = useTruncateText(title, 40);

  const c = useTranslations("COMMON");
  const format = useFormatter();
  const dateTime = new Date(updated.at);
  const now = new Date();

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={link}>
        <Card className="border-border/50 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <CardContent className="p-4">
            {viewMode === "grid" ? (
              // Grid layout - more compact, vertical
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="relative">
                    <ReadOnlyEmoji
                      className="h-10 w-10"
                      selectedEmoji={emoji}
                    />
                    <Badge 
                      variant={type === "task" ? "default" : "secondary"}
                      className="absolute -top-1 -right-1 text-xs h-4 px-1"
                    >
                      {type === "task" ? (
                        <Target className="h-2 w-2" />
                      ) : (
                        <Brain className="h-2 w-2" />
                      )}
                    </Badge>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors flex-1">
                      {!title && type === "mindMap" && c("DEFAULT_NAME.MIND_MAP")}
                      {!title && type === "task" && c("DEFAULT_NAME.TASK")}
                      {title && truncatedTitle}
                    </h3>
                    {starred && <StarSvg className="w-3 h-3 flex-shrink-0" />}
                  </div>
                  
                  {updated.by && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{format.relativeTime(dateTime, now)}</span>
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    {assignedTo.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        {assignedTo.slice(0, 2).map((user) => (
                          <AssignedToTaskUser key={user.id} userInfo={user} />
                        ))}
                        {assignedTo.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{assignedTo.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                    {tags.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        {tags.slice(0, 2).map((tag) => (
                          <TagItem key={tag.id} tag={tag} />
                        ))}
                        {tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // List layout - horizontal
              <div className="flex items-start gap-4">
                <div className="relative">
                  <ReadOnlyEmoji
                    className="h-12 w-12 sm:h-14 sm:w-14"
                    selectedEmoji={emoji}
                  />
                  <Badge 
                    variant={type === "task" ? "default" : "secondary"}
                    className="absolute -top-1 -right-1 text-xs h-5 px-1.5"
                  >
                    {type === "task" ? (
                      <Target className="h-2.5 w-2.5" />
                    ) : (
                      <Brain className="h-2.5 w-2.5" />
                    )}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                          {!title && type === "mindMap" && c("DEFAULT_NAME.MIND_MAP")}
                          {!title && type === "task" && c("DEFAULT_NAME.TASK")}
                          {title && truncatedTitle}
                        </h3>
                        {starred && <StarSvg className="w-4 h-4 flex-shrink-0" />}
                      </div>
                      
                      {updated.by && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Clock className="h-3 w-3" />
                          <span>Updated {format.relativeTime(dateTime, now)}</span>
                          <span>by</span>
                          <UserHoverInfo className="px-0 text-sm" user={updated.by} />
                        </div>
                      )}
                      
                      <div className="flex items-center flex-wrap gap-2">
                        {assignedTo.length > 0 && (
                          <div className="flex items-center gap-1">
                            {assignedTo.slice(0, 3).map((user) => (
                              <AssignedToTaskUser key={user.id} userInfo={user} />
                            ))}
                            {assignedTo.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{assignedTo.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                        {tags.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            {tags.slice(0, 3).map((tag) => (
                              <TagItem key={tag.id} tag={tag} />
                            ))}
                            {tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{tags.length - 3} tags
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
