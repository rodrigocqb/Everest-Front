import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

function postSignUp(body) {
  const promise = axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/sign-up`,
    body
  );
  return promise;
}

export { postSignUp };
