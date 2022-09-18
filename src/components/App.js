import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import GlobalStyle from "../styles/GlobalStyle";
import Cart from "./Cart";
import FinishOrder from "./FinishOrder";
import Home from "./Home";
import Login from "./Login";
import PrivatePage from "./PrivatePage";
import SignUp from "./SignUp";
import UserAccount from "./UserAccount";
import Wishlist from "./Whislist";
import Orders from "./Orders";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <GlobalStyle />
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/wishlist"
              element={
                <PrivatePage>
                  <Wishlist />
                </PrivatePage>} />

            <Route
              path="/orders"
              element={
                <PrivatePage>
                  <Orders />
                </PrivatePage>} />

            <Route
              path="/account"
              element={
                <PrivatePage>
                  <UserAccount />
                </PrivatePage>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivatePage>
                  <Cart />
                </PrivatePage>
              }
            />
            <Route
              path="/order"
              element={
                <PrivatePage>
                  <FinishOrder />
                </PrivatePage>
              }
            />
          </Routes>
        </CartContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
