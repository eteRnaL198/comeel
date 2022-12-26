import React, { useState, useMemo } from "react";

import { CafeteriaList } from "containers/Cafeteria";
import { Header } from "containers/Header";
import { Login } from "containers/Login";
import { Top } from "containers/Top";
import { SideMenu } from "containers/SideMenu";
import Div100vh from "react-div-100vh";
import { User, PageName } from "common/types";

function App() {
  const [user, setUser] = useState<User>();
  const [pageName, setPageName] = useState<PageName>("login");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleLogin = (user?: User) => {
    if (user) {
      setUser(user);
      setPageName("top");
    } else setUser(undefined);
  };

  const getPage = useMemo(() => {
    return {
      top: <Top />,
      cafeteriaList: <CafeteriaList />,
      login: <Login handleLogin={handleLogin} />,
    }[pageName];
  }, [pageName]);

  return (
    <Div100vh className="bg-orange-100 flex flex-col overflow-y-auto">
      <Header
        setPageName={setPageName}
        user={user}
        setIsSideMenuOpen={setIsSideMenuOpen}
      />
      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        setIsSideMenuOpen={setIsSideMenuOpen}
        setPageName={setPageName}
      />
      {getPage}
    </Div100vh>
  );
}

export default App;
