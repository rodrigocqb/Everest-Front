import axios from "axios";

function postSignUp(body) {
  const promise = axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/sign-up`,
    body
  );
  return promise;
}

function postLogin(body) {
  const promise = axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/login`,
    body
  );
  return promise;
}
function getProducts() {
  const promise = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/products`
  );
  return promise;
}
function getAuth(){
  if(!localStorage.getItem("user")) {
    return false
  }
  const token = JSON.parse(localStorage.getItem("user")).token
  console.log(token)
  const authorization = {headers: {authorization: `Bearer ${token}`}}
  return authorization
}

function addToCart(productId) {
  const authorization = getAuth();
  const promise = axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/cart`, productId ,authorization
  );
  return promise;
}

export { postSignUp, postLogin, getProducts, addToCart };
