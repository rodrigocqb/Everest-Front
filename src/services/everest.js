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

export { postSignUp, postLogin, getProducts };
