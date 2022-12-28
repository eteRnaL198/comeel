import { useSetRecoilState } from "recoil";
import React, { useState, useEffect } from "react";
import { User } from "common/types";
import { existDocument, fetchDocument } from "service/firebase";
import { userState } from "globalStates/user";
import { PageName } from "common/types";

type Props = {
  setPageName: (name: PageName) => void;
};

export const Login: React.FC<Props> = ({ setPageName }) => {
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setUser(undefined);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleLoginClick = async () => {
    if (!id) {
      setErrorMessage("ログインIDを入力してください");
      return;
    }
    try {
      const existUser = await existDocument("users", id);
      if (!existUser) {
        setErrorMessage("ユーザーが存在しません");
        return;
      }
      const user = await fetchDocument<User>("users", id);
      setUser({ id: id, name: user.name });
      setPageName("top");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("ログインに失敗しました");
    }
  };

  return (
    <>
      <div className="flex flex-col grow gap-10 justify-around mx-auto w-11/12">
        <div>
          <h2 className="font-bold mb-5 text-center text-gray-900 text-xl md:text-4xl">
            「未来」からの「ありがとう」
          </h2>
          <p>
            こちらのサービスは、こども食堂への支援を募ることを目的としています。
            あなたから頂いたご支援は、こどもたちからの「ありがとう」のメッセージとしてお返しいたします。
          </p>
          <p className="mt-10 text-red-600">
            現状は決済機能を実装していないため、実際に支払いは発生せず支援も行われません。
            <br />
            また、こども食堂の情報は全て架空のものです。
          </p>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="ログインIDを入力"
            className="mb-8 px-4 py-3 rounded-full text-center"
            onChange={handleChange}
            value={id}
          />
          <button
            className="bg-orange-300 mx-auto p-1 rounded-full w-6/12"
            onClick={handleLoginClick}
          >
            ログイン
          </button>
          <p className="text-center text-red-500">{errorMessage}</p>
        </div>
      </div>
    </>
  );
};
