import styled from "styled-components";
import { getProducts } from "../services/everest";
import { useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductModal";
export default function ProductCards() {
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const promise = getProducts()
        promise.then((res) => {
            setProducts(res.data)
        })
            .catch((res) => console.log(res))
    }, [])

    return (
        <>
            {(showModal) ? (<ProductModal setShowModal={setShowModal} />) : (<></>)}
            <CardsWrappler>
                {products.map((product) => <Card
                    setShowModal={setShowModal}
                    image={product.image}
                    productName={product.name}
                    shipping={product.shipping}
                    price={product.price}
                    quantity={product.quantity}
                    units={product.units}
                    description={product.description}
                />)}
            </CardsWrappler>
        </>
    )
}
function Card({ setShowModal, image, productName, shipping, price }) {


    return (
        <CardWrappler onClick={() => setShowModal(true)} >
            <img src={image} />
            <h1>{productName}</h1>
            <h2>{shipping}</h2>
            <h3>${price}</h3>
            <Button onClick={(e) => {
                e.stopPropagation()
                console.log('add-to-cart')
            }} >
                <IoCart size={20} />
            </Button>
        </CardWrappler>
    )
}

const CardsWrappler = styled.div`
width: 100%;
display: flex;
gap: 5px;
margin-top: 40px;
flex-wrap: wrap;
`
const CardWrappler = styled.div`
margin-top: 40px;
box-sizing: border-box;
padding: 8px;
width: 290px;
height: 420px;
background-color: #F2E9E7;
/* background-color: #4A4E69; */
display:flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
border-radius: 10px;
position: relative;
img {
    width: 273px;
    height: 273px;
}
h1{
    //product name:
    font-weight: 400;
    color: #1d1f1f;
    font-size: 18px;
}
h2{
    //shipping:
    font-weight: 700;
    font-style: bold;
    color: #04d483;
    font-size: 18px;
}
h3 {
    //Price:
    font-weight: 700;
    color: black;
    font-size: 22px;
}

`
const Button = styled.div`
position: absolute;
margin-right: 20px;
margin-bottom: 10px;
bottom:0;
right: 0;
cursor: pointer;
`
