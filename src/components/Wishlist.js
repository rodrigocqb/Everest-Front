import { useEffect, useState } from "react";
import styled from "styled-components";
import { listWishlist } from "../services/everest";
import { IoClose, IoHeartDislikeSharp, IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromWishlist } from "../services/everest";
export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    listWishlist().then((list) => setWishlist(list.data));
  }, [refresh]);

  return (
    <WishlistWrappler>
      <Close onClick={() => navigate("/")}>
        <IoClose size={25} />
      </Close>
      <h1>Wishlist</h1>
      {wishlist.length === 0 && <h1>Your wishlist is empty</h1>}
      {wishlist.map((item) => (
        <Card
          key={item.productId}
          wishlist={wishlist}
          image={item.image}
          price={item.price}
          date={item.date}
          name={item.name}
          productId={item.productId}
          itemId={item._id}
          refresh={refresh}
          setRefresh={setRefresh}
          navigate={navigate}
        />
      ))}
    </WishlistWrappler>
  );
}
function Card({
  image,
  price,
  date,
  name,
  productId,
  itemId,
  refresh,
  setRefresh,
  navigate,
  wishlist,
}) {
  return (
    <CardWrappler>
      <img src={image} alt="" />
      <h2>{name}</h2>
      <div>
        <div>
          <h2>${Number(price).toFixed(2)}</h2>
          <h4>
            Inserted on: <br />
            {date}
          </h4>
        </div>
        <ButtonsWrappler>
          <IoHeartDislikeSharp
            onClick={() => {
              removeFromWishlist(itemId)
                .then(() => {
                  setRefresh(!refresh);
                  if (wishlist.length <= 1) {
                    navigate("/");
                  }
                })
                .catch((error) => console.log(error));
            }}
            size={25}
          />
          <IoCart
            onClick={() => {
              addToCart(productId);
              removeFromWishlist(itemId)
                .then(() => {
                  if (wishlist.length <= 1) {
                    navigate("/");
                  }
                  setRefresh(!refresh);
                })
                .catch(() => navigate("/login"));
            }}
            size={25}
          />
        </ButtonsWrappler>
      </div>
    </CardWrappler>
  );
}

const WishlistWrappler = styled.div`
  position: relative;
  margin: auto auto;
  margin-top: 80px;
  width: 45vw;
  height: 80vh;
  max-height: 80vh;
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
  }
  h1:nth-of-type(2) {
    margin-top: 50%;
    font-size: 20px;
    text-align: center;
  }

  > div {
    width: 100%;
    height: 100%;
  }
`;
const CardWrappler = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  max-height: 120px;
  max-width: 600px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 6px;
    margin-right: 10px;
  }
  > div {
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
  }
`;
const ButtonsWrappler = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 20px;
  max-width: 40px;
  height: 40px;
`;
