import { ModernAddTaskModal } from "./ModernAddTaskModal";

interface Props {
  userId: string;
}

export const AddTaskShortcut = ({ userId }: Props) => {
  return <ModernAddTaskModal userId={userId} />;
};
