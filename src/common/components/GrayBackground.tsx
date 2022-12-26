import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isSideMenuOpen: boolean) => void;
};

export const GrayBackground: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`absolute bg-black h-full opacity-50 w-full z-40
        ${isOpen ? "" : "hidden"}
        `}
      onClick={() => {
        setIsOpen(false);
      }}
    ></div>
  );
};
