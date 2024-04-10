import Link from "next/link";
import { getUserSession } from "@/lib/actions/auth.actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import UserAvatar from "@/components/shared/user-avatar";
import SignOutButton from "@/components/button/signout-button";

const UserNav = async () => {
  const { session } = await getUserSession();

  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link className={buttonVariants()} href="/signin">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserNav;
