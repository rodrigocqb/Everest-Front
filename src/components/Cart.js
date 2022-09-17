import { useEffect, useState } from "react";
import styled from "styled-components";
import { Main } from "../common/Main";
import { addToCart, getCart, removeItemFromCart } from "../services/everest";
import Header from "./Header";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);
  return (
    <>
      <Header />
      <CreamMain>
        <CartSection>
          <div>
            <h1>Your cart</h1>
          </div>
          <ItemsWrapper>
            {cart.length === 0
              ? "Your cart is empty"
              : cart.map((value) => (
                  <div key={value.productId}>
                    <img src={value.image} alt="" />
                    <InfoWrapper>
                      <p>{value.name}</p>
                      <p>{`$${value.price.toFixed(2)}`}</p>
                    </InfoWrapper>
                    <ButtonsWrapper>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (value.units > 0) {
                            addToCart(value.productId)
                              .then(() => {
                                console.log("added");
                                if (refresh === true) {
                                  setRefresh(false);
                                } else {
                                  setRefresh(true);
                                }
                              })
                              .catch((err) =>
                                alert("There are no more units left")
                              );
                          }
                        }}
                      >
                        +
                      </div>
                      <p>{`Qty: ${value.quantity}`}</p>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItemFromCart(value.productId)
                            .then(() => {
                              console.log("removed");
                              setRefresh(!refresh);
                            })
                            .catch((err) => {
                              alert("An error has occurred");
                              console.log(err);
                            });
                        }}
                      >
                        -
                      </div>
                    </ButtonsWrapper>
                  </div>
                ))}
          </ItemsWrapper>
          <BuyButton>Buy</BuyButton>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  ::-webkit-scrollbar {
    display: block;
  }

  h1 {
    font-size: 36px;
    font-weight: 700;
  }

  > div {
    width: 100%;
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

const BuyButton = styled.button`
  margin-top: 50px;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: #f2e9e4;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  font-size: 22px;
  color: #22223b;
  font-weight: 500;
`;
