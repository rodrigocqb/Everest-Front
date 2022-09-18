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
import Wishlist from "./Wishlist";
import OrderHistory from "./OrderHistory";
import ProductsContext from "../contexts/ProductsContext";
import Search from "./Search";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <ProductsContext.Provider value={{ products, setProducts }}>
            <GlobalStyle />
            <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/wishlist"
                element={
                  <PrivatePage>
                    <Wishlist />
                  </PrivatePage>
                }
              />

              <Route
                path="/order-history"
                element={
                  <PrivatePage>
                    <OrderHistory />
                  </PrivatePage>
                }
              />

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
          </ProductsContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
