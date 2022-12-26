import React, { FC } from "react";
import { Cafeteria, Ticket } from "common/types";

type Props = Cafeteria & { handleClick: (menu: Ticket[]) => void };

export const Card: FC<Props> = ({
  name,
  prefecture,
  city,
  address,
  img,
  menu,
  handleClick,
}) => {
  return (
    <div className="bg-white drop-shadow-lg flex gap-3 p-3 rounded-2xl text-left">
      <img className="object-contain rounded-xl w-4/12" src={img} />
      <div className="flex flex-col grow items-center justify-between">
        <p className="font-bold">{name}</p>
        <div className="text-left">
          <p className="text-xs">
            {prefecture}
            {city}
            {address}
          </p>
        </div>
        <button
          onClick={() => {
            handleClick(menu);
          }}
          className="bg-orange-300 rounded-full w-10/12"
        >
          支援
        </button>
      </div>
    </div>
  );
};
