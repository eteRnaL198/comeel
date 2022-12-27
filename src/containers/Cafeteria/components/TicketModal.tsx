import React from "react";
import { useRecoilValue } from "recoil";
import { Ticket, User } from "common/types";
import { GrayBackground } from "common/components";
import { purchase } from "../helper";
import { userState } from "globalStates/user";

type Props = {
  menu: Ticket[];
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsMessageModalOpen: (isOpen: boolean) => void;
};

export const TicketModal: React.FC<Props> = ({
  menu,
  isModalOpen,
  setIsModalOpen,
  setIsMessageModalOpen,
}) => {
  const user = useRecoilValue(userState) as User;

  const handlePurchaseClick = async (ticket: Ticket) => {
    setIsModalOpen(false);
    try {
      await purchase(user, ticket);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="absolute bottom-0 flex flex-col gap-5 justify-center left-0 m-auto pointer-events-none right-0 top-0 w-10/12 z-50">
        {menu.map((ticket, idx) => (
          <div
            className="bg-white flex flex-col items-center py-2 pointer-events-auto rounded-2xl w-full z-50"
            key={idx}
          >
            <div className="flex flex-col gap-2 grow justify-around text-center w-10/12">
              <p className="font-bold text-2xl">{ticket.name}</p>
              <p className="text-lg">{ticket.price}円</p>
              <p className="text-lg">支援者名: {user.name}</p>
              <div className="flex justify-between gap-4">
                <button
                  className="border-gray-400 border-2 flex flex-1 justify-center p-1 rounded-full"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  キャンセル
                </button>
                <button
                  className="bg-orange-300 flex flex-1 justify-center p-1 rounded-full"
                  onClick={() => {
                    handlePurchaseClick(ticket);
                    setIsMessageModalOpen(true);
                  }}
                >
                  購入
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <GrayBackground isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
