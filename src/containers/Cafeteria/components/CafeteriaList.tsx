import React, { FC, useEffect, useState } from "react";
import { Card, TicketModal, MessageModal } from "..";
import { fetchAllDocumentsWithId, getDocRef } from "service/firebase";
import { Cafeteria, Ticket } from "common/types";

export const CafeteriaList: FC = () => {
  const [cafeterias, setCafeterias] = useState<Cafeteria[]>([]);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Ticket[]>([]);

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
        {[...cafeterias, ...cafeterias].map((elm, idx) => {
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
        />
      )}
    </>
  );
};
