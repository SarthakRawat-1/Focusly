import { useTranslations } from "next-intl";
import { MessageSquare, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  workspaceName: string;
}

export const Header = ({ workspaceName }: Props) => {
  const t = useTranslations("CHAT.HEADER");
  return (
    <div className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            {t("TITLE", { workspaceName })}
          </h3>
          <p className="text-sm text-muted-foreground">
            Group conversation
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          <Users className="h-3 w-3 mr-1" />
          Online
        </Badge>
      </div>
    </div>
  );
};
