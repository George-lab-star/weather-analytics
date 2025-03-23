"use client";
import { useState } from "react";

import {
  Sheet_r,
  SheetHeader_r,
  SheetTitle_r,
  SheetContent_r,
} from "@/components/ui/sheet-right";

import SheetItem from "../ui/sheet-item";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Settings, LogOut, LogIn } from "lucide-react";

const AccountSheet: React.FC<{
  isLoggedIn: boolean | undefined;
  username: string | undefined;
}> = ({ isLoggedIn, username }) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleAvatarClick = () => {
    setIsSheetOpen(true);
  };
  return (
    <>
      <div onClick={handleAvatarClick} className="cursor-pointer">
        <Avatar className="size-12 rounded-full">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Sheet_r open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent_r>
          <SheetHeader_r>
            <SheetTitle_r>Account</SheetTitle_r>
            <p>{username}</p>
            {isLoggedIn === false ? (
              <SheetItem url="/login" Icon={LogIn} name="Log In" />
            ) : (
              <div>
                <SheetItem url="/settings" Icon={Settings} name="Settings" />
                <SheetItem url="/logout" Icon={LogOut} name="Log Out" />
              </div>
            )}
          </SheetHeader_r>
        </SheetContent_r>
      </Sheet_r>
    </>
  );
};

export default AccountSheet;
