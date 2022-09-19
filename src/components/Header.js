import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../common/Title";
import { IoSearch, IoPersonCircle, IoCart, IoExit } from "react-icons/io5";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import CartContext from "../contexts/CartContext";

export default function Header() {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [search, setSearch] = useState("");

  let quantity = 0;
  cart.forEach((value) => {
    quantity += value.quantity;
  });

  const navigate = useNavigate();

  function executeSearch() {
    if (search !== "") {
      const query = search.replaceAll(" ", "+").toLowerCase();
      navigate(`/search?q=${query}`);
    }
  }

  return (
    <HeaderWrapper>
      <Link to="/">
        <Title>EVEREST</Title>
      </Link>
      <Searchbar>
        <input
          name="searchbar"
          type="text"
          placeholder="What are you searching for?"
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch onClick={executeSearch} />
      </Searchbar>
      <UserDiv>
        <div>
          <IoPersonCircle />
          <p>
            {user ? (
              <Link to="/account">{`Hello, ${user.name}!`}</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </p>
        </div>
        {user ? (
          <></>
        ) : (
          <div>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        )}
        <Link to="/cart">
          <CartDiv>
            <IoCart />
            {quantity > 0 && <div>{quantity}</div>}
          </CartDiv>
        </Link>
        {user ? (
          <IoExit
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                localStorage.removeItem("user");
                window.location.reload();
              }
            }}
          />
        ) : (
          <></>
        )}
      </UserDiv>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  z-index: 1;
  height: 120px;
  width: 100vw;
  background-color: #f2e9e4;
  filter: drop-shadow(0px 4px 4px #c9ada7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: fixed;
  top: 0;
  left: 0;
`;

const Searchbar = styled.div`
  width: 50vw;
  max-width: 600px;
  height: 58px;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    outline: none;
    font-size: 20px;
    padding-left: 15px;
    padding-right: 40px;
    border: 0px;
    font-weight: 400;
    &::placeholder {
      color: #9a8c98;
    }
  }

  svg {
    font-size: 30px;
    fill: #9a8c98;
    position: absolute;
    right: 10px;
    top: 14px;
    cursor: pointer;
  }
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: space-between;
  color: #22223b;
  width: 15vw;

  div {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }

  svg {
    font-size: 30px;
    fill: #4a4e69;
    cursor: pointer;
  }

  a {
    color: #22223b;
  }
`;

const CartDiv = styled.div`
  width: fit-content;
  position: relative;
  div {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ff595e;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
`;
