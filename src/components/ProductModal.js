import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { IoClose } from "react-icons/io5";

export default function ProductModal({ setShowModal, products, showModal }) {
  const [productClicked, setProductClicked] = useState({})
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    const choosed = products.filter((product) => product._id === showModal);
    const price = Number(choosed[0].price);
    const shipping = Number(choosed[0].shipping);
    choosed[0].price = price.toFixed(2)
    choosed[0].shipping = shipping.toFixed(2)
    setProductClicked(choosed[0])
  }, [showModal])

  console.log(productClicked.image)
  return (
    <ModalWrappler onClick={() => setShowModal(false)}>
      <Modal>
        <CloseButton onClick={() => setShowModal(false)}>
        <IoClose size={25}/>
        </CloseButton>
        <img src={productClicked.image} alt="" />
        <DetailsWrappler>
          <h1>{productClicked.name}</h1>

          <Details>
            <h2>${productClicked.price}</h2>
            <h2>{(productClicked.shipping === '0.00') ? 'Free Shipping' : `$${productClicked.shipping} shipping and import fees`} </h2>
            <h2>{productClicked.units} units left</h2>
            <h2>{(productClicked.sizes)? productClicked.sizes.map(size => `[${size}]`):''} sizes</h2>
            <h3>ABOUT THIS ITEM</h3>
            <h2>{productClicked.description}</h2>
            <h2>{(productClicked.categories)? productClicked.categories.map(categorie => `[${categorie}]`):''}</h2>          
            </Details>
            <Buttons>
            
            <button onClick={()=> console.log('buy')}>
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
        <button onClick={()=> console.log('Cart')}>
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
        <button onClick={()=> console.log('Wishlist')} >
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
        </button >
            </Buttons>
        </DetailsWrappler>
      </Modal>
    </ModalWrappler>
  );
}
const Buttons = styled.div`
display: flex;
margin-top: 80px;
width: 100%;
justify-content: space-around;
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
`
const DetailsWrappler = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 50%;
margin-left: 40px;
h1 {
  font-size: 35px;
  font-weight: 400;
}
h2 {
  margin-top: 20px;
  font-size: 20px;
}
h3{
margin-top: 60px;
font-weight: 700;
}
`
const Details = styled.div`
margin-top: 60px;
width: 100%;
box-sizing: content-box;
`
const ModalWrappler = styled.div`
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgb(154, 140, 152, 0.9);
  position: fixed;
  justify-content: center;
  display: flex;
`;
const Modal = styled.div`
display: flex;
position: relative;
box-sizing: border-box;
padding: 80px;
  margin-top: 20px;
  width: 80%;
  height: 80%;
  border-radius: 30px;
  background-color: #f2e9e4;
  img {
    width: 500px;
  }

`
const CloseButton = styled.div`
position: absolute;
right: 0;
top: 0;
margin-top: 30px;
margin-right: 30px;
cursor: pointer;
`
;
