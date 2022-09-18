import styled from "styled-components";
import { getProducts, addToCart } from "../services/everest";
import { useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";

export default function ProductCards({ refresh, setRefresh }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const promise = getProducts();
    promise
      .then((res) => {
        setProducts(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  return (
    <>
      {showModal ? (
        <ProductModal
          setShowModal={setShowModal}
          showModal={showModal}
          products={products}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        <></>
      )}
      <CardsWrappler>
        {products.map((product) => (
          <Card
            key={product._id}
            setShowModal={setShowModal}
            image={product.image}
            productName={product.name}
            shipping={product.shipping}
            price={Number(product.price).toFixed(2)}
            units={product.units}
            productId={product._id}
            navigate={navigate}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ))}
      </CardsWrappler>
    </>
  );
}
function Card({
  setShowModal,
  image,
  productName,
  shipping,
  price,
  units,
  productId,
  navigate,
  refresh,
  setRefresh,
}) {
  return (
    <CardWrappler
      onClick={() => {
        setShowModal(productId);
      }}
      units={units}
      shipping={shipping}
    >
      <img src={image} alt="" />
      <Filter units={units} />
      <h1>{productName}</h1>
      {units === 0 ? (
        <h4>Sold off</h4>
      ) : Number(shipping) === 0 ? (
        <h2>Free Shipping</h2>
      ) : (
        <h2>${Number(shipping).toFixed(2)} Shipping Fees</h2>
      )}
      <h3>${price}</h3>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          if (units > 0) {
            addToCart(productId)
              .then(() => {
                console.log("added");
                setRefresh(!refresh);
              })
              .catch(() => navigate("/login"));
          }
        }}
      >
        <IoCart size={20} />
      </Button>
    </CardWrappler>
  );
}

const CardsWrappler = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 40px;
  flex-wrap: wrap;
`;
const CardWrappler = styled.div`
  margin-top: 40px;
  box-sizing: border-box;
  padding: 8px;
  width: 290px;
  height: 420px;
  background-color: ${(props) => (props.units === 0 ? "#b0afb0" : "#f2e9e7")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  position: relative;
  img {
    width: 273px;
    height: 273px;
    position: relative;
  }
  h1 {
    //product name:
    font-weight: 400;
    color: #1d1f1f;
    font-size: 18px;
  }
  h2 {
    //shipping:
    font-weight: 700;
    font-style: bold;
    color: ${(props) => (Number(props.shipping) === 0 ? "#04d483" : "#1d1f1f")};
    font-size: 18px;
  }
  h3 {
    //Price:
    font-weight: 700;
    color: black;
    font-size: 22px;
  }
  h4 {
    //sold off
    font-weight: 700;
    font-style: bold;
    color: red;
    font-size: 18px;
  }
`;
const Filter = styled.div`
  width: 273px;
  height: 273px;
  background-color: grey;
  position: absolute;
  opacity: ${(props) => (props.units === 0 ? "60%" : "0")};
`;
const Button = styled.div`
  position: absolute;
  margin-right: 20px;
  margin-bottom: 10px;
  bottom: 0;
  right: 0;
  cursor: pointer;
`;
