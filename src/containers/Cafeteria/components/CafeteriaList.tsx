import React, { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Card, TicketModal } from "..";
import { fetchAllDocumentsWithId, getDocRef } from "service/firebase";
import { Cafeteria, Ticket } from "common/types";
import { MessageModal } from "common/components";
import { User } from "common/types";
import { userState } from "globalStates/user";

export const CafeteriaList: FC = () => {
  const [cafeterias, setCafeterias] = useState<Cafeteria[]>([]);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Ticket[]>([]);
  const user = useRecoilValue(userState) as User;

  useEffect(() => {
    fetchAllDocumentsWithId<Cafeteria>("cafeterias").then((docs) => {
      const cafes = docs.map((doc) => {
        const menu = doc.menu.map((ticket) => {
          return {
            ...ticket,
            cafeteria: getDocRef("cafeterias", doc.id),
          };
        });
        return {
          ...doc,
          menu,
        };
      });
      setCafeterias(cafes);
    });
  }, []);

  const handleCardClick = (menu: Ticket[]) => {
    setIsTicketModalOpen(true);
    setSelectedMenu(menu);
  };

  return (
    <>
      <div className="flex flex-col gap-5 grow mx-auto pb-7 w-11/12">
        {cafeterias.map((elm, idx) => {
          return (
            <Card
              key={idx}
              id={elm.id}
              name={elm.name}
              prefecture={elm.prefecture}
              city={elm.city}
              address={elm.address}
              img={elm.img}
              menu={elm.menu}
              handleClick={handleCardClick}
            />
          );
        })}
      </div>
      {isTicketModalOpen && (
        <TicketModal
          menu={selectedMenu}
          isModalOpen={isTicketModalOpen}
          setIsModalOpen={(flag) => {
            setIsTicketModalOpen(flag);
          }}
          setIsMessageModalOpen={(flag) => {
            setIsMessageModalOpen(flag);
          }}
        />
      )}
      {isMessageModalOpen && (
        <MessageModal
          isModalOpen={isMessageModalOpen}
          setIsModalOpen={(flag) => {
            setIsMessageModalOpen(flag);
          }}
        >
          <p className="font-bold">{user.name}さん</p>
          <p className="font-bold">ご支援ありがとうございます</p>
          <p className="text-left">
            公式LINEより、子どもたちから「ありがとう」のメッセージが届くのをお待ちください。
          </p>
        </MessageModal>
      )}
    </>
  );
};
