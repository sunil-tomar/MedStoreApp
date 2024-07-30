import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Product from "./components/product/Product";
import ProductTable from "./components/product/ProductTable";
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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Product />} />
            <Route path="/product" element={<Product />} />
            <Route element={<PrivateRoute />}>
              <Route path="/prod" element={<ProductTable />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </MedListProvider>
  );
}
