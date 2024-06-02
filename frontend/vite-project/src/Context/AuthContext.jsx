import React, { createContext, useEffect, useState } from "react";
import data_info from "../assets/data-info.js";
import { useParams } from "react-router-dom";
export const AuthContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
}

const AuthProvider = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [cartItems, setCarItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:7000/allproducts")
        .then((res) => res.json())
        .then((data) => setAllProducts(data))
  }, []);

  const addToCart = (itemId) => {
    setCarItems((prevItem) => ({ ...prevItem, [itemId]: (prevItem[itemId] || 0) + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:7000/addtocart', {
        method: "POST", 
        headers: {
          Accept: "application/form-data",
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({"itemId": itemId})
      }).then((res) => res.json()).then((data) => console.log(data));
    }
  }

  const removeFromCart = (itemId) => {
    setCarItems((prevItem) => ({ ...prevItem, [itemId]: prevItem[itemId] - 1 }));
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allproducts.find((product) => product.id === item);
        totalAmount += itemInfo.new_prices * cartItems[item];
      }
    }
    return totalAmount;
  }

  const getShippingAmount = () => {
    let shippingAmount;
    const totalAmount = getTotalCartAmount();
    if (totalAmount > 0 && totalAmount < 200) {
      shippingAmount = data_info.shipping;
    }
    else if (totalAmount > 200 && totalAmount < 500) {
      shippingAmount = data_info.shipping * 0.5;
    }
    else {
      shippingAmount = data_info.shipping * 0;
    }
    return shippingAmount;
  }

  const getTotalAmount = () => {
    let total;
    const totalAmount = getTotalCartAmount();
    const shippingAmount = getShippingAmount();
    total = totalAmount + shippingAmount;
    return total;
  }

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems = cartItems[item];
      }
    }
    return totalItems;
  }

  const contextValue = {
    allproducts, cartItems, addToCart, removeFromCart, getTotalCartAmount, getShippingAmount, getTotalAmount, getTotalCartItems
  };

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthProvider;