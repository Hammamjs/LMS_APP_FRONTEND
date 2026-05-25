import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { useSelector } from 'react-redux';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui';
import {
  ChevronDown,
  GraduationCap,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';

export const UserMenu = ({ handleLogout }: { handleLogout: () => void }) => {
  const user = useSelector(selectCurrentUser);

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar ?? ''} alt={user.username} />

            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
          </Avatar>

          <span className="hidden text-sm font-medium sm:inline-block">
            {user.username.split(' ')[0]}
          </span>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar ?? ''} alt={user.username} />

            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.username}</span>

            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex cursor-pointer items-center gap-2"
          >
            <GraduationCap className="h-4 w-4" />
            My Learning
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex cursor-pointer items-center gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex cursor-pointer items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="hidden items-center gap-2 sm:flex">
      <Button variant="ghost" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>

      <Button asChild>
        <Link href="/sign-up">Join for Free</Link>
      </Button>
    </div>
  );
};
