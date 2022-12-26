import React, { FC } from "react";
import { Cafeteria } from "common/types";

type Props = Cafeteria;

export const Card: FC<Props> = ({
  name,
  prefecture,
  city,
  address,
  img,
  menu,
}) => {
  const handleClick = () => {
    window.open("https://www.youtube.com/watch?v=7W4Ma1Gn7b0"); // TODO 食券購入モーダルを表示
  };

  return (
    <div
      className="bg-white drop-shadow-lg flex gap-3 p-3 rounded-2xl text-left"
      onClick={handleClick}
    >
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
          onClick={handleClick}
          className="bg-orange-300 rounded-full w-10/12"
        >
          支援
        </button>
      </div>
    </div>
  );
};
