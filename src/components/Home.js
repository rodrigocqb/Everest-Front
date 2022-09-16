import styled from "styled-components";
import { useLocal } from "../hooks/useLocal";
import Header from "./Header";
import ProductCards from "./ProductCards";

export default function Home() {
  useLocal();
  return (
    <>
      <Header />
      <Main>
        <ProductCards/>
      </Main>
    </>
  );
}

const Main = styled.main`
  background-color: #22223b;
  margin-top: 120px;
  min-height: calc(100vh - 120px);
`;
