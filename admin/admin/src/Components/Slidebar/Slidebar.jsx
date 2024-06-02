import React from "react";
import { Link } from "react-router-dom";
import './Slidebar.css';

const Slidebar = () => {
   return(
    <>
      <div className="slidebar">
        <Link to="/addproduct" style={{textDecoration: "none"}}>
          <div className="slidebar-item">
            <img src="../src/assets/add-product.png" alt="" />
            <p>Add Product</p>
          </div>
        </Link>
        <Link to="/listproducts" style={{textDecoration: "none"}}>
          <div className="slidebar-item">
            <img src="../src/assets/all-product.png" alt="" />
            <p>List Products</p>
          </div>
        </Link>
      </div>
    </>
   );
}

export default Slidebar