import { useContext, useEffect, useState } from "react";
import { Main } from "../common/Main";
import CartContext from "../contexts/CartContext";
import { useLocal } from "../hooks/useLocal";
import { getCart } from "../services/everest";
import Header from "./Header";
import ProductCards from "./ProductCards";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const { setCart } = useContext(CartContext);

  useLocal();

  useEffect(() => {
    getCart()
      .then((res) => {
        setCart(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setCart, refresh]);

  return (
    <>
      <Header />
      <Main>
        <ProductCards refresh={refresh} setRefresh={setRefresh} />
      </Main>
    </>
  );
}
