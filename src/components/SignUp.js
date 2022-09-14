import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../common/Form";
import { Title } from "../common/Title";
import { postSignUp } from "../services/everest";

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.confirmPassword !== form.password) {
      return alert("The passwords do not match");
    }
    setDisabled(true);
    postSignUp({
      name: form.name,
      email: form.email,
      password: form.password,
    })
      .then(() => navigate("/login"))
      .catch((err) => {
        console.log(err);
        alert(
          "There was an error when trying to sign up.\nCheck your inputs and try again."
        );
        setDisabled(false);
      });
  }

  return (
    <main>
      <TitleWrapper>EVEREST</TitleWrapper>
      <Form disabled={disabled} onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          type="text"
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
        <input
          placeholder="Confirm your password"
          name="confirmPassword"
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
            <p>Sign Up</p>
          )}
        </button>
      </Form>
      <Link to="/login">
        <Span>Already a member? Log in!</Span>
      </Link>
    </main>
  );
}

const TitleWrapper = styled(Title)`
  margin-top: 15vh;
`;

const Span = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #22223b;
`;
