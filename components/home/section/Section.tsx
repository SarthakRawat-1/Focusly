"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { HomePageImage } from "@/types/extended";
import { ImagesCarousel } from "../carousel/ImagesCarousel";
import { useIsVisible } from "@/hooks/useIsVisible";

interface Props {
  reverse?: boolean;
  title: string;
  desc: string;
  images: HomePageImage[];
  id?: string;
}

export const Section = ({ reverse, title, desc, images, id }: Props) => {
  const { isVisible, ref } = useIsVisible();
  return (
    <section
      id={id}
      ref={ref}
      className="py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
          reverse ? '' : ''
        }`}>
          {/* Text Content */}
          <div className={`space-y-6 ${reverse ? '' : 'lg:order-2'}`}>
            <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl leading-tight">
              {title}
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-muted-foreground">
              {desc}
            </p>
          </div>
          
          {/* Image */}
          <div className={`relative group ${reverse ? '' : 'lg:order-1'}`}>
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-lg group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300 h-[300px] lg:h-[350px]">
              <ImagesCarousel images={images} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
