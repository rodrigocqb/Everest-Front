import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../common/Form";
import { Main } from "../common/Main";
import CartContext from "../contexts/CartContext";
import { completeOrder, getCart } from "../services/everest";
import { CartSection } from "./Cart";
import Header from "./Header";

export default function FinishOrder() {
  const { cart, setCart } = useContext(CartContext);
  const [disabled, setDisabled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [form, setForm] = useState({
    street: "",
    number: 0,
    zipCode: 0,
    city: "",
    state: "",
    cardNumber: "0000000000000000",
    expirationDate: "01/01",
    name: "",
    securityCode: "000",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getCart()
      .then((res) => {
        setCart(res.data);
        console.log(res.data);
        if (res.data.length === 0 && !completed) {
          alert("Please add something to your cart first");
          return navigate("/");
        }
      })
      .catch((err) => {
        alert("There was an error when trying to load your cart");
        console.error(err);
      });
  }, [setCart, navigate, completed]);

  let shipping = 0;
  let subtotal = 0;
  cart.forEach((value) => {
    shipping += value.shipping;
  });
  cart.forEach((value) => {
    subtotal += value.price * value.quantity;
  });

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    completeOrder(form)
      .then((res) => {
        setCompleted(true);
      })
      .catch((err) => {
        alert("There was an error when trying to complete your order");
        setDisabled(false);
        console.log(err);
      });
  }

  return (
    <>
      <Header />
      <CreamMain>
        <OrderContainer>
          <div>
            <h1>Your Order</h1>
          </div>
          {completed === true ? (
            <div>
              <h4>
                Your order has been completed! Go back to the home page if you
                want to continue shopping!
              </h4>
            </div>
          ) : (
            <>
              <InfoContainer>
                <h2>Products</h2>
                <div>
                  <h3>Name</h3>
                  <h3>Price</h3>
                </div>
                <Wrapper>
                  {cart.map((value) => (
                    <div key={value._id}>
                      <p>{value.name}</p>
                      <p>{value.price.toFixed(2)}</p>
                    </div>
                  ))}
                </Wrapper>
                <Wrapper>
                  <p>{`Subtotal: $${subtotal.toFixed(2)}`}</p>
                  <p>{`Shipping fees: $${shipping.toFixed(2)}`}</p>
                  <p>{`Total: $${(shipping + subtotal).toFixed(2)}`}</p>
                </Wrapper>
              </InfoContainer>
              <Form onSubmit={handleSubmit} disabled={disabled}>
                <input
                  placeholder="Street"
                  name="street"
                  type="text"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <input
                  placeholder="Number"
                  name="number"
                  type="number"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <input
                  placeholder="Zip Code"
                  name="zipCode"
                  type="number"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <input
                  placeholder="City"
                  name="city"
                  type="text"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <input
                  placeholder="State"
                  name="state"
                  type="text"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <input
                  placeholder="Card Number"
                  name="cardNumber"
                  type="number"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <input
                  placeholder="Expiration Date"
                  name="expirationDate"
                  type="text"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <input
                  placeholder="Name"
                  name="name"
                  type="text"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <input
                  placeholder="Security Code"
                  name="securityCode"
                  type="number"
                  disabled={disabled}
                  onChange={(e) =>
                    handleForm({
                      value: e.target.value,
                      name: e.target.name,
                    })
                  }
                  required
                />
                <button type="submit">
                  {disabled ? (
                    <ThreeDots
                      height="13"
                      width="51"
                      color="#FFFFFF"
                      ariaLabel="three-dots-loading"
                    />
                  ) : (
                    <p>Complete Order</p>
                  )}
                </button>
              </Form>
            </>
          )}
        </OrderContainer>
      </CreamMain>
    </>
  );
}

const OrderContainer = styled(CartSection)`
  h2 {
    font-size: 30px;
    font-weight: 600;
  }

  form > button {
    background-color: #c9ada7;
  }

  h4 {
    font-size: 24px;
    margin-top: 20px;
  }
`;

const CreamMain = styled(Main)`
  background-color: #f2e9e4;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  h2 {
    margin-top: 30px;
    margin-bottom: 13px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  div {
    width: 70%;
    display: flex;
    justify-content: space-between;
    word-break: break-word;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  margin-bottom: 20px;
  div {
    width: 100%;
  }
`;
