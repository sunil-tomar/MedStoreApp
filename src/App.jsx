import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./components/product/Product";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./Route/PrivateRoute";
import { createContext, useEffect, useState } from "react";
import MedListProvider from "./store/store";
import ProductPagination from "./components/product/ProductPagination";
import ProductBilling from "./components/product/ProductBilling";
import { LOGIN_PAGE, WELCOME_PAGE } from "./store/ComponentName";

export default function App() {
  const ProductListContext = createContext();
  //debugger;

  return (
    <MedListProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />} />
            {/* <Route path={WELCOME_PAGE} element={<ProductBilling />} /> */}
            <Route path={WELCOME_PAGE} element={<Product />} />
            <Route path="/product-pagination" element={<ProductPagination />} />
            <Route path="/product" element={<Product />} />
            <Route path={LOGIN_PAGE} element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </MedListProvider>
  );
}
