import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "globalStates/user";
import { User } from "common/types";
import { updateDocument } from "service/firebase";
import { MessageModal } from "common/components";

export const UserInformation = () => {
  const user = useRecoilValue(userState);
  const [userName, setUserName] = useState<User["name"]>(user?.name as string);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setUserName(user?.name as string);
  }, []);

  const handleSaveClick = async () => {
    if (!userName) return;
    try {
      setUser({ id: user?.id as string, name: userName });
      updateDocument("users", user?.id as string, { name: userName });
      setIsModalOpen(true);
      setModalMessage("ユーザーネームを保存しました");
    } catch (e) {
      console.error(e);
      setIsModalOpen(true);
      setModalMessage("保存に失敗しました");
    }
  };

  return (
    <>
      <div className="flex flex-col grow mx-auto w-10/12">
        <p className="font-bold text-xl">ユーザー名</p>
        <p className="mb-2 text-sm text-gray-500">
          ご購入いただいた食券に支援者名として記載されます
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            className="grow py-1 pl-5 rounded-full text-xl"
            placeholder="ユーザー名を入力"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button
            className=" bg-orange-300 px-2 rounded-full"
            onClick={handleSaveClick}
          >
            保存
          </button>
        </div>
      </div>
      {isModalOpen && (
        <MessageModal
          isModalOpen={isModalOpen}
          setIsModalOpen={(flag) => {
            setIsModalOpen(flag);
          }}
        >
          <p className="te  xt-center">{modalMessage}</p>
        </MessageModal>
      )}
    </>
  );
};
