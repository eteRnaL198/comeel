import React from "react";

type Props = {
  title: string;
  body: string[];
};

export const Card: React.FC<Props> = ({ title, body }) => {
  return (
    <div className="bg-white flex flex-col mx-auto p-8 w-11/12">
      <h2 className="font-bold mb-3 text-2xl">{title}</h2>
      {body.map((body, idx) => (
        <p key={idx}>{body}</p>
      ))}
    </div>
  );
};
