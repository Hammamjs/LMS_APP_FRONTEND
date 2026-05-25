import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { Camera } from 'lucide-react';
import { useSelector } from 'react-redux';

type Props = {
  isEditing: boolean;
};

export const ProfileAvatar = ({ isEditing }: Props) => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="relative">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user?.avatar ?? ''} alt={user?.username} />
        <AvatarFallback className="text-2xl">
          {user?.username.charAt(0)}
        </AvatarFallback>
      </Avatar>
      {isEditing && (
        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
          <Camera className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
