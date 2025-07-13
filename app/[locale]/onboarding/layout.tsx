import React from "react";
import { LocaleSwitcher } from "../../../components/switchers/LocaleSwitcher";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-full bg-background">
      {/* Header with theme switchers */}
      <div className="absolute top-0 right-0 z-50">
        <div className="flex items-center gap-3 p-4 md:p-6">
          <LocaleSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />
          <ThemeSwitcher
            alignHover="end"
            alignDropdown="end"
            size={"icon"}
            variant={"outline"}
          />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </main>
  );
};

export default OnboardingLayout;
