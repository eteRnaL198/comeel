import React, { useState } from "react";

import { CafeteriaList } from "containers/Cafeteria";
import { Header } from "containers/Header";
import { Login } from "containers/Login";
import Div100vh from "react-div-100vh";
import { User } from "common/type";

function App() {
  const [user, setUser] = useState<User>();

  return (
    <Div100vh className="bg-orange-100 flex flex-col overflow-y-auto">
      <Header />
      {user ? (
        <>
          <CafeteriaList />
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </Div100vh>
  );
}

export default App;
