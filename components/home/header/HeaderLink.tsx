import { Button } from "@/components/ui/button";
import { scrollToHash } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  Icon: LucideIcon;
  title: string;
  href: string;
}

export const HeaderLink = ({ Icon, href, title }: Props) => {
  return (
    <Button
      onClick={() => {
        scrollToHash(href);
      }}
      className="text-secondary-foreground p-6 h-28 w-44 rounded-xl gap-4 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 flex flex-col justify-center items-center bg-transparent transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
    >
      <Icon />
      <p>{title}</p>
    </Button>
  );
};
