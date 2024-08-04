import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./components/product/Product";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./Route/PrivateRoute";
import { createContext, useEffect, useState } from "react";
import MedListProvider from "./store/store";

export default function App() {
  const ProductListContext = createContext();
  //debugger;

  return (
    <MedListProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />} />
            <Route path="/" element={<Product />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </MedListProvider>
  );
}
