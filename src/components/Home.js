import styled from "styled-components";
import Header from "./Header";

export default function Home() {
  return (
    <>
      <Header />
      <Main></Main>
    </>
  );
}

const Main = styled.main`
  background-color: #22223b;
  margin-top: 120px;
  min-height: calc(100vh - 120px);
`;
