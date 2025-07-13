"use client";
import { homePageHeaderImgs, homePageHeaderLinks } from "@/lib/constants";
import { HeaderLink } from "./HeaderLink";
import { ImagesCarousel } from "../carousel/ImagesCarousel";
import { useIsVisible } from "@/hooks/useIsVisible";

export const Header = () => {
  const { isVisible, ref } = useIsVisible();
  return (
    <header className="mt-20 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1
            ref={ref}
            className="font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6"
          >
            <span>
              Focus<span className="text-primary">ly</span>
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Your Ultimate Productive App</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="w-full flex flex-wrap items-center justify-center mb-16 gap-4 sm:gap-6">
          {homePageHeaderLinks.map((link, i) => (
            <HeaderLink
              key={i}
              Icon={link.Icon}
              href={link.href}
              title={link.title}
            />
          ))}
        </div>

        {/* Hero Image */}
        <div className="group max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-lg group-hover:shadow-xl group-hover:scale-[1.01] transition-all duration-300">
            <ImagesCarousel
              images={homePageHeaderImgs}
              className="h-[350px] lg:h-[400px] z-20 relative"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
