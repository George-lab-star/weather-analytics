"use client";

import { redirect } from "next/navigation";
import { useAccountContext } from "@/components/AccountContext/AccountContext";

const LogOut: React.FC = () => {
  const { isLoggedInState } = useAccountContext();
  return (
    <div className="flex flex-col w-[80vh] justify-center">
      <h1>Are you sure?</h1>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            isLoggedInState.setIsLoggedIn(false);
            redirect("/");
          }}
        >
          Log Out
        </button>
        <button
          onClick={() => {
            redirect("/");
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default LogOut;
