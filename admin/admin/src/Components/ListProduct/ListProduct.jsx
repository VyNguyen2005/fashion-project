import React, { useState, useEffect } from "react";
import './ListProduct.css';

const ListProducts = () => {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
      await fetch('http://localhost:7000/allproducts').then((res) => res.json()).then((data) => {setAllProducts(data)});
    }
    useEffect(() => {
      fetchInfo();
    }, []);

    const removeProduct = async (id) => {
      await fetch('http://localhost:7000/deleteproduct', {
        method: "DELETE",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
      });
      await fetchInfo();
    }
    return(
        <>
          <div className="listproducts">
            <h1>All Products List</h1>
            <div className="listproducts-format-main">
              <p>Products</p>
              <p>Title</p>
              <p>Old Price</p>
              <p>New Price</p>
              <p>Category</p>
              <p>Remove</p>
            </div>
            <div className="listproducts-allproducts">
              <hr />
              {allproducts.map((product, index) => {
                return <div key={index} className="listproducts-format-main listproducts-format">
                  <img src={product.image} alt="" className="listproducts-format-icon" />
                  <p>{product.name}</p>
                  <p>${product.old_prices}</p>
                  <p>${product.new_prices}</p>
                  <p>{product.category}</p>
                  <img onClick={() => {removeProduct(product.id)}} src="./src/assets/delete_icon.png" alt="" className="listproducts-format-icon-remove" />
                </div>
              })}
            </div>
          </div>
        </>
    );
}

export default ListProducts