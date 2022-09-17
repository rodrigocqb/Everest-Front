import { useEffect, useState } from "react";
import styled from "styled-components";
import { Main } from "../common/Main";
import { getCart } from "../services/everest";
import Header from "./Header";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart()
      .then((res) => {
        setCart(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert("There was an error when trying to load your cart");
        console.error(err);
      });
  }, []);
  return (
    <>
      <Header />
      <CreamMain>
        <CartSection>
          <h1>Your cart</h1>
          <ItemsWrapper>
            {cart.length === 0
              ? "Your cart is empty"
              : cart.map((value) => (
                  <div key={value.productId}>
                    <img src={value.image} alt="" />
                    <InfoWrapper>
                      <p>{value.name}</p>
                      <p>{`$${value.price}`}</p>
                    </InfoWrapper>
                    <ButtonsWrapper>
                      <div>+</div>
                      <p>{`Qty: ${value.quantity}`}</p>
                      <div>-</div>
                    </ButtonsWrapper>
                  </div>
                ))}
          </ItemsWrapper>
        </CartSection>
      </CreamMain>
    </>
  );
}

const CartSection = styled.section`
  margin-top: 80px;
  width: 45vw;
  height: 70vh;
  max-height: 70vh;
  background-color: #22223b;
  border-radius: 20px;
  padding: 60px;
  color: #ffffff;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: block;
  }

  h1 {
    font-size: 36px;
    font-weight: 700;
  }
`;

const CreamMain = styled(Main)`
  background-color: #f2e9e4;
`;

const ItemsWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  & > div {
    display: flex;
    justify-content: space-between;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 6px;
  }

  p {
    font-size: 22px;
  }
`;

const InfoWrapper = styled.div`
  width: 40%;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  div {
    background-color: #f2e9e4;
    width: 40px;
    height: 40px;
    color: #22223b;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
  }

  p {
    font-size: 14px;
  }
`;
