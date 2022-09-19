import { useContext, useEffect, useState } from "react";
import { Main } from "../common/Main";
import CartContext from "../contexts/CartContext";
import ProductsContext from "../contexts/ProductsContext";
import { useLocal } from "../hooks/useLocal";
import { getCart, getProducts } from "../services/everest";
import Header from "./Header";
import ProductCards from "./ProductCards";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const { setCart } = useContext(CartContext);
  const { products, setProducts } = useContext(ProductsContext);

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

    getProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((res) => console.log(res));
  }, [setCart, refresh, setProducts]);

  return (
    <>
      <Header />
      <Main>
        <ProductCards
          refresh={refresh}
          products={products}
          setRefresh={setRefresh}
        />
      </Main>
    </>
  );
}
