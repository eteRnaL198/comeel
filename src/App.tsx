import React, { useState, useMemo, useEffect } from "react";
import { RecoilRoot } from "recoil";
import Div100vh from "react-div-100vh";
import { CafeteriaList } from "containers/Cafeteria";
import { Header } from "containers/Header";
import { Login } from "containers/Login";
import { Top } from "containers/Top";
import { SideMenu } from "containers/SideMenu";
import { UserInformation } from "containers/UserInformation";
import { PageName } from "common/types";
import { initFirebase } from "service/firebase";

function App() {
  const [pageName, setPageName] = useState<PageName>("login");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    initFirebase();
  }, []);

  const getPage = useMemo(() => {
    return {
      top: <Top />,
      cafeteriaList: <CafeteriaList />,
      login: <Login setPageName={(name) => setPageName(name)} />,
      userInformation: <UserInformation />,
    }[pageName];
  }, [pageName]);

  return (
    <Div100vh className="bg-orange-100 flex flex-col overflow-y-auto">
      <RecoilRoot>
        <Header
          setPageName={setPageName}
          setIsSideMenuOpen={setIsSideMenuOpen}
        />
        <SideMenu
          isSideMenuOpen={isSideMenuOpen}
          setIsSideMenuOpen={setIsSideMenuOpen}
          setPageName={setPageName}
        />
        {getPage}
      </RecoilRoot>
    </Div100vh>
  );
}

export default App;
