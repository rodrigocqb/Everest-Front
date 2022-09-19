import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Main } from "../common/Main";
import CartContext from "../contexts/CartContext";
import ProductsContext from "../contexts/ProductsContext";
import { getCart, getProducts } from "../services/everest";
import Header from "./Header";
import ProductCards from "./ProductCards";

export default function Search() {
  const [refresh, setRefresh] = useState(false);

  const { products, setProducts } = useContext(ProductsContext);
  const { setCart } = useContext(CartContext);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getCart()
      .then((res) => {
        setCart(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    if (products.length === 0) {
      getProducts()
        .then((res) => {
          setProducts(res.data);
        })
        .catch((res) => console.log(res));
    }
  }, [setCart, refresh, setProducts, products.length]);

  const filteredProducts = products.filter((value) => {
    const queries = searchParams.get("q").split(" ");
    for (let i = 0; i < queries.length; i++) {
      if (
        value.name.toLowerCase().includes(queries[i]) ||
        value.description.toLowerCase().includes(queries[i])
      ) {
        return true;
      }
      for (let j = 0; j < value.categories.length; j++) {
        if (value.categories[j].toLowerCase().includes(queries[i])) {
          return true;
        }
      }
    }
    return false;
  });

  return (
    <>
      <Header />
      <Main>
        <ProductCards
          refresh={refresh}
          products={filteredProducts}
          setRefresh={setRefresh}
        />
      </Main>
    </>
  );
}
