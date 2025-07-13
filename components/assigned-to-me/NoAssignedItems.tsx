"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { User, UserCheck, Sparkles, Heart, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const NoAssignedItems = () => {
  const t = useTranslations("ASSIGNED_TO_ME");
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="relative p-6 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full border border-blue-400/20">
          <User className="h-16 w-16 text-blue-500" />
        </div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-2 -right-2"
        >
          <UserCheck className="h-6 w-6 text-green-400" />
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-1 -left-1"
        >
          <Sparkles className="h-5 w-5 text-purple-400" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4 max-w-md"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          No Assignments Yet
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          You don't have any tasks or mind maps assigned to you at the moment. Check back later or explore your workspaces!
        </p>
      </motion.div>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl" />
        <div className="relative p-8 bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border/50">
          {/* Simple illustration */}
          <div className="flex items-center justify-center space-x-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
            <div className="p-4 bg-primary/10 rounded-lg border-2 border-dashed border-primary/30">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary/30 rounded" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-4"
      >
        <p className="text-sm text-muted-foreground">
          Start collaborating by exploring your workspaces or creating new content
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
            <Link href="/dashboard">
              <User className="h-4 w-4 mr-2" />
              Explore Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/workspace">
              Browse Workspaces
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};