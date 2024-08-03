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
            <Route path="/" element={<PrivateRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </AuthProvider>
      </Router>
    </MedListProvider>
  );
}
