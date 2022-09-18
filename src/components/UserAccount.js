import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Main } from "../common/Main";
import UserContext from "../contexts/UserContext";
import Header from "./Header";
import { BiHeart, BiNotepad } from "react-icons/bi";

export default function UserAccount() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Main>
        <Wrapper>
          <div>
            <TitleContainer>Your account</TitleContainer>
            <InfoWrapper>
              <h1>About you</h1>
              <p>{user.name}</p>
              <p>{`Member since ${user.date}`}</p>
            </InfoWrapper>
            <Options>
              <Link to="/order-history">
                <div>
                  <BiNotepad />
                  <p>Your orders</p>
                </div>
              </Link>
              <Link to="/wishlist">
                <div onClick={() => navigate("/wishlist")}>
                  <BiHeart />
                  <p>Your wishlist</p>
                </div>
              </Link>
            </Options>
          </div>
        </Wrapper>
      </Main>
    </>
  );
}

const Wrapper = styled.section`
  width: 320px;
  margin-top: 180px;
  background-color: #f2e9e4;
  filter: drop-shadow(0px 4px 4px #c9ada7);
  color: #22223b;
  border-radius: 20px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: #22223b;
  }
`;

const TitleContainer = styled.h1`
  font-size: 36px;
`;

const InfoWrapper = styled.div`
  margin-top: 30px;
  h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  p {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

const Options = styled.div`
  div {
    margin-top: 20px;
    font-size: 30px;
    display: flex;
  }
  svg {
    margin-right: 10px;
  }
`;
