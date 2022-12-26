import React from "react";
import { Ticket } from "common/types";

type Props = {
  menu: Ticket[];
  setIsModalOpen: (isOpen: boolean) => void;
};

export const Modal: React.FC<Props> = ({ menu, setIsModalOpen }) => {
  return (
    <div className="absolute bottom-0 bg-white flex flex-col h-2/6 left-0 m-auto right-0 rounded-2xl top-0 w-9/12 z-50">
      <div className="flex flex-col grow justify-around m-auto text-center w-10/12">
        <p className="font-bold text-2xl">{menu[0].name}</p>
        <p className="text-lg">{menu[0].price}円</p>
        <div className="flex justify-between gap-4">
          <button
            className="border-gray-400 border-2 flex flex-1 justify-center p-2 rounded-full"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            キャンセル
          </button>
          <button
            className="bg-orange-300 flex flex-1 justify-center p-2 rounded-full"
            onClick={() => {
              setIsModalOpen(false);
              window.open("https://www.youtube.com/watch?v=7W4Ma1Gn7b0");
            }}
          >
            購入
          </button>
        </div>
      </div>
    </div>
  );
};
