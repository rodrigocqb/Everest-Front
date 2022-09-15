import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import GlobalStyle from "../styles/GlobalStyle";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <GlobalStyle />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
