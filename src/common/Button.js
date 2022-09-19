import styled from "styled-components";
import { addToCart, addToWishlist } from "../services/everest.js";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Button({ type, productClicked, refresh, setRefresh }) {
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  switch (type) {
    case "buy":
      return (
        <ButtonWrappler disabled={disabled}>
          <button
            onClick={() => {
              console.log(productClicked);
              setDisabled(true);
              addToCart(productClicked._id)
                .then(() => {
                  navigate("/order");
                })
                .catch(() => navigate("/login"));
            }}
          >
            {disabled ? (
              <ThreeDots
                height="13"
                width="51"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
              />
            ) : (
              <p>Buy</p>
            )}
          </button>
        </ButtonWrappler>
      );
    case "cart":
      return (
        <ButtonWrappler disabled={disabled}>
          <button
            onClick={() => {
              console.log(productClicked);
              setDisabled(true);
              addToCart(productClicked._id)
                .then(() => {
                  setDisabled(false);
                  setRefresh(!refresh);
                })
                .catch(() => navigate("/login"));
            }}
          >
            {disabled ? (
              <ThreeDots
                height="13"
                width="51"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
              />
            ) : (
              <p>Add to Cart</p>
            )}
          </button>
        </ButtonWrappler>
      );
    case "wishlist":
      return (
        <ButtonWrappler disabled={disabled}>
          <button
            onClick={() => {
              setDisabled(true);
              addToWishlist(productClicked._id)
                .then(() => setDisabled(false))
                .catch(() => navigate("/login"));
            }}
          >
            {disabled ? (
              <ThreeDots
                height="13"
                width="51"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
              />
            ) : (
              <p>Wishlist</p>
            )}
          </button>
        </ButtonWrappler>
      );
    default:
      return <></>;
  }
}

const ButtonWrappler = styled.div`
  margin-top: 60px;
  width: 100%;

  button {
    width: 100px;
    max-width: 400px;
    height: 46px;
    background-color: #22223b;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    border: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${(props) => (props.disabled ? 0.7 : 1)};
    cursor: pointer;
  }
`;
