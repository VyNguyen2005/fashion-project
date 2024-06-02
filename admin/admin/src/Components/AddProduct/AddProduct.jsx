import React, { useState } from "react";
import './AddProduct.css';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_prices: "",
    old_prices: "",
  });

  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  }
  const changeHandler = (e) => {
    e.preventDefault();
    setProductDetails({...productDetails, [e.target.name]: e.target.value});
  }
  const AddProduct = async() => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    
    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:7000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    }).then((res) => res.json()).then((data) => {responseData=data});
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:7000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Content-Type': "application/json"
        },
        body: JSON.stringify(product)
      }).then((res) => res.json()).then((data) => data.success?alert("Product Added"):alert("Failed"));
    }
    
  };
  return (
    <>
      <div className="addproduct">
        <div className="addproduct-item-container">
          <p>Product Title</p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" autocomplete="off"/>
        </div>
        <div className="add-product-price">
          <div className="addproduct-item-container">
            <p>Price</p>
            <input value={productDetails.old_prices} onChange={changeHandler} type="text" name="old_prices" placeholder="Type here" autocomplete="off"/>
          </div>
          <div className="addproduct-item-container">
            <p>Offer Price</p>
            <input value={productDetails.new_prices} onChange={changeHandler} type="text" name="new_prices" placeholder="Type here" autocomplete="off"/>
          </div>
        </div>
        <div className="addproduct-item-container">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-item-selector">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-item-container">
          <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):"./src/assets/upload.png"} alt="" className="addproduct-thumnail-image"/>
          </label>
          <input onChange={imageChangeHandler} type="file" name="image" id="file-input" hidden/>
        </div>
        <button onClick={() => {AddProduct()}} className="addproduct-btn">ADD PRODUCT</button>
      </div>
    </>
  );
}

export default AddProduct