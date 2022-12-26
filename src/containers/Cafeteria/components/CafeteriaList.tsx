import React, { FC, useEffect, useState } from "react";
import { Card } from "..";
import { fetchAllDocuments } from "service/firebase";
import { Cafeteria } from "common/types";

export const CafeteriaList: FC = () => {
  const [cafeterias, setCafeterias] = useState<Cafeteria[]>([]);

  useEffect(() => {
    fetchAllDocuments<Cafeteria>("cafeterias").then((docs) => {
      setCafeterias(docs);
    });
  }, []);

  return (
    <div className="h-full m-auto w-11/12">
      <div className="flex flex-col gap-5 pb-7">
        {[...cafeterias, ...cafeterias].map((elm, idx) => {
          return (
            <Card
              name={elm.name}
              prefecture={elm.prefecture}
              city={elm.city}
              address={elm.address}
              img={elm.img}
              menu={elm.menu}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
};
