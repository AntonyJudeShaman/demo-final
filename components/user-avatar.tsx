import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name" >; // Include email
}


export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const imageURLFromLocalStorage = localStorage.getItem("imageURL");
  const imageURLToDisplay = imageURLFromLocalStorage || user.image;

  return (
    <Avatar {...props}>
      {imageURLToDisplay ? (
        <AvatarImage alt="Picture" src={imageURLToDisplay} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
