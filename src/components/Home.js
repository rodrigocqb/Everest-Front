import { Main } from "../common/Main";
import { useLocal } from "../hooks/useLocal";
import Header from "./Header";
import ProductCards from "./ProductCards";

export default function Home() {
  useLocal();
  return (
    <>
      <Header />
      <Main>
        <ProductCards />
      </Main>
    </>
  );
}
