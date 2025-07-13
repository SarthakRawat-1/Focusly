import {
  homePageAssignmentFilterAndStarredImgs,
  homePageCalendarImgs,
  homePageChatImgs,
  homePageMindMapsImgs,
  homePagePomodoroImgs,
  homePageRolesAndSettingsImgs,
  homePageTasksImgs,
} from "@/lib/constants";
import { Header } from "./header/Header";
import { Nav } from "./nav/Nav";
import { Section } from "./section/Section";
import { TextSection } from "./section/TextSection";
import { FeatureGrid } from "./section/FeatureGrid";
import { Footer } from "./footer/Footer";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="space-y-0">
          <TextSection
            title="Your Productivity Partner"
            desc="Maximize your team's efficiency with Focusly—an all-in-one workspace designed to consolidate your essential tools into one cohesive platform."
          />

          <FeatureGrid
            features={[
              {
                id: "Mind-Maps",
                title: "Visualize with Mind Maps",
                desc: "Mind Maps allow users to build visually compelling projects, making complex ideas easier to understand. The user-friendly interface offers extensive customization, enabling smooth navigation and collaboration through tagging and task assignment features.",
                images: homePageMindMapsImgs
              },
              {
                id: "Tasks",
                title: "Tasks & Notes",
                desc: "The Tasks feature provides a smooth environment for creating notes and organizing projects. With an enhanced editor and auto-save functionality, users can assign tasks, add categories, tag items, and set deadlines, all integrated seamlessly with the calendar for optimal organization.",
                images: homePageTasksImgs
              }
            ]}
          />

          <FeatureGrid
            features={[
              {
                id: "Roles",
                title: "Roles & Permissions",
                desc: "Focusly's role management system simplifies workspace oversight. Admins and owners can adjust user roles, manage account and workspace settings, and oversee permissions to ensure smooth collaboration.",
                images: homePageRolesAndSettingsImgs
              },
              {
                id: "Pomodoro",
                title: "Pomodoro Timer",
                desc: "The built-in Pomodoro timer supports focused work sessions by letting users set custom session times, rounds, breaks, and alerts—tailoring the experience to each user's productivity needs.",
                images: homePagePomodoroImgs
              }
            ]}
          />

          <TextSection
            title="The Future of Team Collaboration"
            desc="Effortlessly share projects and invite others to join with easy shareable links. Focusly enables instant project review and real-time chatting with team members from anywhere."
          />

          <FeatureGrid
            features={[
              {
                id: "Chat",
                title: "Chat & Alerts",
                desc: "Engage in real-time discussions, share files, and keep everyone informed with instant notifications so you're always in sync with your team.",
                images: homePageChatImgs
              },
              {
                id: "Calendar",
                title: "Unified Calendar",
                desc: "Stay organized with the Unified Calendar, where all scheduled tasks and deadlines are displayed. It enhances teamwork by ensuring everyone has clear visibility of project timelines and due dates.",
                images: homePageCalendarImgs
              }
            ]}
          />

          <Section
            id="Filters"
            title="Quick Access"
            desc="Instantly locate what you need with a smart search feature, quick access tabs, and filtering tools. Tagging and marking essential items make it easy to keep your most important projects just a click away, streamlining your workflow."
            images={homePageAssignmentFilterAndStarredImgs}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};