import React, { useState } from "react";
import { User } from "common/type";
import { existDocument } from "service/firebase";

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const Login: React.FC<Props> = ({ setUser }) => {
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const userId = e.currentTarget.value;
    if (!userId) {
      setErrorMessage("ログインIDを入力してください");
      return;
    }
    try {
      const existUser = await existDocument("users", userId);
      if (!existUser) {
        setErrorMessage("ユーザーが存在しません");
        return;
      }
      setUser({ id: userId, name: "" });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("ログインに失敗しました");
    }
  };

  return (
    <>
      <div className="grid gap-10 mx-auto w-11/12">
        <p className="font-bold text-center text-gray-900 text-4xl">Welcome</p>
        <input
          type="text"
          placeholder="ログインIDを入力"
          className="px-4 py-3 rounded-full text-center"
          onChange={handleChange}
        />
        <button
          className="bg-orange-300 mx-auto p-1 rounded-full w-5/12"
          value={id}
          onClick={handleClick}
        >
          ログイン
        </button>
        <p className="text-center text-red-500">{errorMessage}</p>
      </div>
    </>
  );
};
