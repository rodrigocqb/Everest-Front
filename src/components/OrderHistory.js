import styled from "styled-components";
import { useEffect, useState } from "react";
import { listOrders } from "../services/everest";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    listOrders().then((list) => setOrders(list.data));
  }, [refresh]);

  return (
    <>
      <OrdersWrappler>
        <>
          <h1>Order History</h1>
          {orders.length === 0 && (
            <h1>Your order history is empty. Buy something from us!</h1>
          )}
          {orders.map((item) => (
            <Card
              key={item._id}
              address={item.address}
              payment={item.paymentData}
              date={item.date}
              refresh={refresh}
              setRefresh={setRefresh}
              navigate={navigate}
              products={item.products}
            />
          ))}
        </>
      </OrdersWrappler>
      <Close>
        <IoClose onClick={() => navigate("/")} size={25} />
      </Close>
    </>
  );
}

function Card({ date, address, products, payment }) {
  console.log(address.street);
  let total = 0;
  products.forEach((value) => {
    total += value.price * value.quantity + value.shipping;
  });
  return (
    <CardWrappler>
      <section>
        <h2>{date}</h2>
      </section>
      <div>
        <h2>Address:</h2>
        <h3>State: {address.state}</h3>
        <h3>City: {address.city}</h3>
        <h3>
          Street: {address.street},{address.number}
        </h3>
        <h3>Zip code: {address.zipCode}</h3>
      </div>
      <div>
        <h2>Payment:</h2>
        <h3>Card ending in: {payment.cardNumber.slice(-4)}</h3>
        <h3>Name: {payment.name}</h3>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      <div>
        <h2>Products:</h2>
        {products.map((product) => (
          <ProductInfo
            image={product.image}
            name={product.name}
            price={product.price}
            shipping={product.shipping}
            quantity={product.quantity}
          />
        ))}
      </div>
    </CardWrappler>
  );
}

function ProductInfo({ image, name, price, quantity, shipping }) {
  return (
    <ProductsWrappler>
      <img src={image} alt="" />
      <div>
        <h3>{name}</h3>
        <h3>Price: ${Number(price).toFixed(2)}</h3>
        <h3>Shipping cost: ${Number(shipping).toFixed(2)}</h3>
        <h3>Quantity: {quantity}</h3>
      </div>
    </ProductsWrappler>
  );
}

const ProductsWrappler = styled.div`
  margin-top: 20px;
  min-height: 100px;
  display: flex;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 20px;
  }
`;

const OrdersWrappler = styled.div`
  margin: auto auto;
  margin-top: 80px;
  width: 90vw;
  height: 80vh;
  display: flex;

  background-color: #22223b;
  border-radius: 20px;
  padding: 60px;
  color: #ffffff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #9a8c98;
  filter: drop-shadow(0px 6px 4px #c9ada7);

  h1 {
    font-size: 36px;
    font-weight: 700;
  }

  h2 {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  h1:nth-of-type(2) {
    margin-top: 50%;
    font-size: 20px;
    text-align: center;
  }

  > div {
    width: 100%;
  }
  img {
    width: 100px;
    height: 100px;
  }
`;

const CardWrappler = styled.div`
  margin-top: 50px;
  max-width: 600px;
  border: 2px solid white;
  > div {
    min-height: 100px;
    border: 1px solid white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  section {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 20px;
    h2 {
      margin-bottom: 0px;
    }
  }
`;
const Close = styled.div`
  z-index: 1;
  height: 100%;
  margin-top: 20px;
  position: fixed;
  right: 0;
  top: 0;
  svg {
    margin-right: 7vw;
    margin-top: 8vh;
    color: white;
    cursor: pointer;
  }
`;
