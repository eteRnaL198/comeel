import React, { Dispatch, SetStateAction } from "react";
import { PageName } from "common/types";
import Icon from "img/cross.png";

type Props = {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (isSideMenuOpen: boolean) => void;
  setPageName: Dispatch<SetStateAction<PageName>>;
};

type PageNames = {
  name: PageName;
  label: string;
};

export const SideMenu: React.FC<Props> = ({
  isSideMenuOpen,
  setIsSideMenuOpen,
  setPageName,
}) => {
  const pageNames: PageNames[] = [
    {
      name: "top",
      label: "トップ",
    },
    {
      name: "cafeteriaList",
      label: "子ども食堂一覧",
    },
    {
      name: "login",
      label: "ログアウト",
    },
  ];

  return (
    <>
      <div
        className={`absolute bg-white duration-300 h-full p-8 rounded-r-3xl shadow-xl w-10/12 z-50
        ${isSideMenuOpen ? "left-0" : "-left-full"}
        `}
      >
        <div className="flex flex-row-reverse mb-8 w-full">
          <img
            onClick={() => {
              setIsSideMenuOpen(false);
            }}
            src={Icon}
            className="w-7"
          ></img>
        </div>
        <h1 className="font-bold mb-16 text-4xl text-center">Menu</h1>
        <div className="flex flex-col gap-16">
          {pageNames.map((pageName, idx) => (
            <button
              className="border-b-2 border-gray-300 font-bold pb-4 text-2xl text-left"
              key={idx}
              onClick={() => {
                setIsSideMenuOpen(false);
                setPageName(pageName.name);
              }}
            >
              {pageName.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`absolute bg-black h-full opacity-50 w-full z-40
        ${isSideMenuOpen ? "" : "hidden"}
        `}
        onClick={() => {
          setIsSideMenuOpen(false);
        }}
      >
        hoge
      </div>
    </>
  );
};
