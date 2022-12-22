import React, { FC } from "react";

type Props = {
  name: string;
  img: string;
  url: string;
};

export const Card: FC<Props> = ({ name, img, url }) => {
  const handleClick = () => {
    window.open(url);
  };

  return (
    <button
      className="bg-white drop-shadow-lg flex flex-col p-5 rounded-2xl"
      onClick={handleClick}
    >
      <img className="h-1/3 object-contain" src={img} />
      <p>{name}</p>
    </button>
  );
};
