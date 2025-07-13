import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";

interface Props {
  size?: number;
  className?: string;
  profileImage?: string | null;
  username?: string;
}

export const UserAvatar = ({ className, profileImage, size = 16, username }: Props) => {
  return (
    <div
      className={cn(
        "bg-muted rounded-full flex justify-center items-center text-muted-foreground relative overflow-hidden",
        // Remove default sizing to let className control it
        className
      )}
    >
      {profileImage ? (
        <Image 
          src={profileImage} 
          alt={`${username || 'User'} profile picture`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 32px, 40px"
        />
      ) : (
        <User size={size} />
      )}
    </div>
  );
};
