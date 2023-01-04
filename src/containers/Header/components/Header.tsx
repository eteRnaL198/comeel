import React, { FC } from "react";
import { PageName } from "common/types";
import Logo from "img/logo.png";
import Hamburger from "img/hamburger-button.png";
import { useRecoilValue } from "recoil";
import { userState } from "globalStates/user";

type Props = {
  setPageName: (pageName: PageName) => void;
  setIsSideMenuOpen: (isSideMenuOpen: boolean) => void;
};

export const Header: FC<Props> = ({ setPageName, setIsSideMenuOpen }) => {
  const user = useRecoilValue(userState);

  return (
    <header className="bg-white drop-shadow-md font-bold flex justify-between mb-8 px-5 py-2 rounded-b-xl sticky top-0 z-40">
      <button
        className="flex"
        onClick={() => {
          if (user) setPageName("top");
        }}
      >
        <img src={Logo} className="h-8" />
        <p className="text-2xl">こみ～る</p>
      </button>
      {user && (
        <button
          onClick={() => {
            setIsSideMenuOpen(true);
          }}
        >
          <img src={Hamburger} className="w-7"></img>
        </button>
      )}
    </header>
  );
};
