"use client";

import { HomePageImage } from "@/types/extended";
import { ImagesCarousel } from "../carousel/ImagesCarousel";

interface Feature {
  id: string;
  title: string;
  desc: string;
  images: HomePageImage[];
}

interface Props {
  features: Feature[];
}

export const FeatureGrid = ({ features }: Props) => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Images Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {features.map((feature, index) => (
            <div key={feature.id} className="relative group">
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-lg group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300 h-[300px] lg:h-[350px]">
                <ImagesCarousel images={feature.images} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Text Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={`${feature.id}-text`} className="space-y-6">
              <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl leading-tight">
                {feature.title}
              </h2>
              <p className="text-base lg:text-lg leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};