"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import PrivateRoute from "@/components/PrivateRoute";

import { useAccountContext } from "@/components/AccountContext/AccountContext";

import { Bell } from "lucide-react";

import axios from "axios";

import { useRouter } from "next/navigation";

const Settings: React.FC = () => {
  const router = useRouter();
  const { usernameState, isLoggedInState } = useAccountContext();

  return (
    <PrivateRoute>
      <div className="flex flex-col items-center justify-center">
        <h1>Settings</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Bell /> Notifications
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubContent>
                <DropdownMenuSubTrigger>
                  Subscribe to the weather newsletter
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent></DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenu>
        <Button
          onClick={async () => {
            await axios.post(
              "http://localhost:8000/account/delete",
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              },
            );
            usernameState.setUsername("");
            isLoggedInState.setIsLoggedIn(false);
            localStorage.removeItem("token");
            router.push("/");
          }}
        >
          Delete Account
        </Button>
      </div>
    </PrivateRoute>
  );
};

export default Settings;
