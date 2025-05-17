import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./Componants/Navbar";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Footer from "./Componants/Footer";
import { ProductsData } from "./Api/api";
import ProductDetails from "./Componants/ProductDetails";
import FavouriteProducts from "./Pages/FavouriteProducts";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import About from "./Pages/About";
import ResetPassword from "./Pages/resetPassword";
import Contact from "./Pages/Contact";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-20"></div>
      <div className="px-10 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={ProductsData}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>

          <Route
            path="/favouriteproducts"
            element={<FavouriteProducts />}
          ></Route>
        </Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/registerpage" element={<RegisterPage />}></Route>
        <Route path="/loginpage" element={<LoginPage />}></Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
