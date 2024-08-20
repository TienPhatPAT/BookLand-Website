import { useEffect, useState } from "react";
import Routing from "./Routing";
import { initialCart } from "./services/Cart";

function App() {
  useEffect(() => {
    initialCart();
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
