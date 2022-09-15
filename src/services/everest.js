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

export { postSignUp, postLogin };
