"use client";

import { useIsVisible } from "@/hooks/useIsVisible";

interface Props {
  title: string;
  desc: string;
}

export const TextSection = ({ title, desc }: Props) => {
  const { isVisible, ref } = useIsVisible();
  return (
    <section
      ref={ref}
      className="flex flex-col items-center py-12 md:py-16 text-center"
    >
      <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl text-center leading-tight mb-6">
        {title}
      </h2>
      <p className="text-base lg:text-lg max-w-4xl leading-relaxed text-muted-foreground">
        {desc}
      </p>

    </section>
  );
};
