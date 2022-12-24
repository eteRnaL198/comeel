import React from "react";

import { CafeteriaList } from "containers/Cafeteria";
import { Header } from "containers/Header";
import Div100vh from "react-div-100vh";

function App() {
  return (
    <Div100vh className="bg-orange-100 flex flex-col overflow-y-auto">
      <Header />
      <CafeteriaList />
    </Div100vh>
  );
}

export default App;
