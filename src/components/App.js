import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../styles/GlobalStyle";
import SignUp from "./SignUp";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
