import { useState } from "react";
import styled from "styled-components";
import { Form } from "../common/Form";
import { Title } from "../common/Title";

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    console.log(form);
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
          name="Password"
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
        <button type="submit">Sign Up</button>
      </Form>
    </main>
  );
}

const TitleWrapper = styled(Title)`
  margin-top: 15vh;
`;
