import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../styles/GlobalStyle";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/sign-up" element="" />
        <Route path="/login" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
