import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../common/Form";
import UserContext from "../contexts/UserContext";
import { useLocal } from "../hooks/useLocal";
import { postLogin } from "../services/everest";
import { Span, TitleWrapper } from "./SignUp";

export default function Login() {
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useLocal();

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    postLogin(form)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(
          "There was an error when trying to login.\nCheck your inputs and try again"
        );
        setDisabled(false);
      });
  }

  return (
    <main>
      <TitleWrapper>EVEREST</TitleWrapper>
      <Form disabled={disabled} onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          type="email"
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
          placeholder="Password"
          name="password"
          type="password"
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
            <p>Sign In</p>
          )}
        </button>
      </Form>
      <Link to="/sign-up">
        <Span>New here? Create an account!</Span>
      </Link>
    </main>
  );
}
