import { useContext } from "react";

const [products, setProducts] = useContext();
//https://dummyjson.com/products
const fetchProductList = await fetch("https://dummyjson.com/products")
  .then((res) => {
    if (res.status == "200") throw new Error(res);
    return res.json();
  })
  .then((res) => {
    //assign values;
    setProducts(res);
  })
  .catch((error) => {
    console.error(error);
  });
