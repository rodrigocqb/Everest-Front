import { useContext, useEffect } from "react";
import { Main } from "../common/Main";
import CartContext from "../contexts/CartContext";
import { useLocal } from "../hooks/useLocal";
import { getCart } from "../services/everest";
import Header from "./Header";
import ProductCards from "./ProductCards";

export default function Home() {
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
  }, [setCart]);

  return (
    <>
      <Header />
      <Main>
        <ProductCards />
      </Main>
    </>
  );
}
