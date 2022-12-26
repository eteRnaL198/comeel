import React, { FC, useEffect, useState } from "react";
import { Card, Modal } from "..";
import { fetchAllDocuments } from "service/firebase";
import { Cafeteria, Ticket } from "common/types";
import { GrayBackground } from "common/components";

export const CafeteriaList: FC = () => {
  const [cafeterias, setCafeterias] = useState<Cafeteria[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchAllDocuments<Cafeteria>("cafeterias").then((docs) => {
      setCafeterias(docs);
    });
  }, []);

  const handleCardClick = (menu: Ticket[]) => {
    setIsModalOpen(true);
    setMenu(menu);
  };

  return (
    <>
      <div className="flex flex-col gap-5 grow mx-auto pb-7 w-11/12">
        {[...cafeterias, ...cafeterias].map((elm, idx) => {
          return (
            <Card
              key={idx}
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
      {isModalOpen && (
        <>
          <Modal menu={menu} setIsModalOpen={setIsModalOpen} />
          <GrayBackground isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
      )}
    </>
  );
};
