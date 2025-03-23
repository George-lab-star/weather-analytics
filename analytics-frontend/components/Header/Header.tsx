"use client";

import { useEffect } from "react";
import MenuSheet from "../MenuSheet";
import AccountSheet from "../AccountSheet";
import { useAccountContext } from "../AccountContext/AccountContext";

const Header: React.FC = () => {
  const { isLoggedInState } = useAccountContext();
  const { usernameState } = useAccountContext();
  let token = undefined;

  useEffect(() => {
    token = localStorage.getItem("token");
  }, []);

  if (token) {
    isLoggedInState.setIsLoggedIn(true);
  }

  return (
    <div className="h-20 flex items-center justify-between pr-[3vh] pl-[3vh] bg-gray-800">
      <MenuSheet />
      <div className='mr-0 font-["Oswald"] font-bold select-none text-center text-[30px] text-white'>
        <h1>Weather Analytics</h1>
      </div>
      <AccountSheet
        isLoggedIn={isLoggedInState.isLoggedIn}
        username={usernameState.username}
      />
    </div>
  );
};

export default Header;
