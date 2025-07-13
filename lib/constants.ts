import { HomePageImage } from "@/types/extended";
import {
  CalendarDays,
  Clock,
  MessageSquare,
  PencilRuler,
  Workflow,
} from "lucide-react";

export const ACTIVITY_PER_PAGE = 8;
export const MESSAGES_LIMIT = 30;

export const homePageHeaderLinks = [
  {
    href: "Tasks",
    Icon: PencilRuler,
    title: "Tasks & Notes",
  },
  {
    href: "Mind-Maps",
    Icon: Workflow,
    title: "Mind Maps",
  },
  {
    href: "Calendar",
    Icon: CalendarDays,
    title: "Calendar",
  },
  {
    href: "Chat",
    Icon: MessageSquare,
    title: "Group Chat",
  },
  {
    href: "Pomodoro",
    Icon: Clock,
    title: "Pomodoro",
  },
];

export const navLinks = [
  {
    title: "Mind Maps",
    href: "Mind-Maps",
  },
  {
    title: "Tasks",
    href: "Tasks",
  },
  {
    href: "Calendar",
    title: "Integrated Calendar",
  },
  {
    href: "Chat",
    title: "Chat & notifications",
  },
  {
    href: "Pomodoro",
    title: "Pomodoro",
  },
  {
    href: "Roles",
    title: "Roles & Settings",
  },
];

export const homePageHeaderImgs: HomePageImage[] = [
  {
    src: "/images/dashboard_black.png",
    alt: "Dashboard - dark theme",
  },
  {
    src: "/images/dashboard_white.png",
    alt: "Dashboard - light theme",
  },
  {
    src: "/images/workspace_black.png",
    alt: "Workspace main page - dark theme",
  },
  {
    src: "/images/workspace_white.png",
    alt: "Workspace main page - light theme",
  },
  {
    src: "/images/create_workspace.png",
    alt: "Create workspace page",
  },
];

export const homePagePomodoroImgs: HomePageImage[] = [
  {
    src: "/images/pomodoro_black.png",
    alt: "Pomodoro main page - dark theme",
  },
  {
    src: "/images/pomodoro_white.png",
    alt: "Pomodoro main page - light theme",
  },
  {
    src: "/images/pomodoro_settings_black.png",
    alt: "Pomodoro settings page - dark theme",
  },
  {
    src: "/images/pomodoro_settings_white.png",
    alt: "Pomodoro settings page - light theme",
  },
];

export const homePageMindMapsImgs: HomePageImage[] = [
  {
    src: "/images/mind_map_edit_black.png",
    alt: "MindMap Edit page - dark theme",
  },
  {
    src: "/images/mind_map_display_black.png",
    alt: "MindMap Display page - dark theme",
  },
  {
    src: "/images/connection_type_black.png",
    alt: "MindMap Connection Types - dark theme",
  },
  {
    src: "/images/animated_connection_black.png",
    alt: "MindMap Animated Connections - dark theme",
  },
];

export const homePageTasksImgs: HomePageImage[] = [
  {
    src: "/images/task_black.png",
    alt: "Task Content page - dark theme",
  },
  {
    src: "/images/task_edit_black.png",
    alt: "Task Edit page - dark theme",
  },
  {
    src: "/images/task_add_image_black.png",
    alt: "Task Add Image feature - dark theme",
  },
  {
    src: "/images/task_with_image.png",
    alt: "Task with Image content",
  },
  {
    src: "/images/task_edit_image_black.png",
    alt: "Task Edit Image feature - dark theme",
  },
];

export const homePageChatImgs: HomePageImage[] = [
  {
    src: "/images/group_chat_black.png",
    alt: "Group Chat - dark theme",
  },
  {
    src: "/images/group_chat_white.png",
    alt: "Group Chat - light theme",
  },
  {
    src: "/images/notifications_black.png",
    alt: "Notifications - dark theme",
  },
];

export const homePageCalendarImgs: HomePageImage[] = [
  {
    src: "/images/calendar_black.png",
    alt: "Calendar page - dark theme",
  },
  {
    src: "/images/calendar_white.png",
    alt: "Calendar page - light theme",
  },
];

export const homePageAssignmentFilterAndStarredImgs: HomePageImage[] = [
  {
    src: "/images/assigned_black.png",
    alt: "Assigned to Me page - dark theme",
  },
  {
    src: "/images/assigned_white.png",
    alt: "Assigned to Me page - light theme",
  },
  {
    src: "/images/starred_black.png",
    alt: "Starred Items page - dark theme",
  },
  {
    src: "/images/starred_white.png",
    alt: "Starred Items page - light theme",
  },
];

export const homePageRolesAndSettingsImgs: HomePageImage[] = [
  {
    src: "/images/account_settings_black.png",
    alt: "Account Settings - dark theme",
  },
  {
    src: "/images/account_settings_white.png",
    alt: "Account Settings - light theme",
  },
  {
    src: "/images/account_settings_security.png",
    alt: "Account Security Settings",
  },
  {
    src: "/images/account_settings_theme_change.png",
    alt: "Theme Change Settings",
  },
  {
    src: "/images/workspace_members_black.png",
    alt: "Workspace Members - dark theme",
  },
  {
    src: "/images/workspace_members_white.png",
    alt: "Workspace Members - light theme",
  },
  {
    src: "/images/workspace_settings_black.png",
    alt: "Workspace Settings - dark theme",
  },
  {
    src: "/images/workspace_settings_white.png",
    alt: "Workspace Settings - light theme",
  },
  {
    src: "/images/quick_add_task_black.png",
    alt: "Quick Add Task - dark theme",
  },
  {
    src: "/images/quick_add_task_white.png",
    alt: "Quick Add Task - light theme",
  },
  {
    src: "/images/oboarding_black.png",
    alt: "Onboarding Process - dark theme",
  },
  {
    src: "/images/onboarding2_black.png",
    alt: "Onboarding Step 2 - dark theme",
  },
];
