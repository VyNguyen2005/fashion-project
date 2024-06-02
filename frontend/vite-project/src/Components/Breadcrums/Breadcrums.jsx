import React from "react";
import './Breadcrums.css';

const Breadcrums = (props) => {
   const {product} = props;
   return(
    <>
     <div className="breadcrums">
        HOME <img src="../src/assets/arrow.png" alt="" /> SHOP <img src="../src/assets/arrow.png" alt="" /> {product.category} <img src="../src/assets/arrow.png" alt="" /> {product.name}
     </div>
    </>
   );
}

export default Breadcrums