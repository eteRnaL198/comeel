import React from "react";
import { GrayBackground } from "common/components";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
};

export const MessageModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  children,
}) => {
  return (
    <>
      <div className="absolute bottom-0 flex flex-col gap-5 justify-center left-0 m-auto pointer-events-none right-0 top-0 w-10/12 z-50">
        <div className="bg-white duration-500 flex flex-col items-center py-4 pointer-events-auto rounded-2xl w-full z-50">
          <div className="flex flex-col gap-2 grow justify-around text-center w-10/12">
            {children}
            <button
              className="bg-orange-300 flex flex-1 justify-center p-1 rounded-full"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
      <GrayBackground isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
