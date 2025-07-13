import { ModernDashboardHeader } from "./ModernDashboardHeader";

interface Props {
  addManualRoutes?: {
    name: string;
    href: string;
    useTranslate?: boolean;
    emoji?: string;
  }[];
  className?: string;
  children?: React.ReactNode;
  workspaceHref?: string;
  hideBreadCrumb?: boolean;
  showingSavingStatus?: boolean;
  showBackBtn?: boolean;
}

export const DashboardHeader = async (props: Props) => {
  return <ModernDashboardHeader {...props} />;
};
