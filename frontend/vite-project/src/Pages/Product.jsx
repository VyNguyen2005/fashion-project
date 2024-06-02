import React, { useContext } from "react"
import { AuthContext } from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import Breadcrums from "../Components/Breadcrums/Breadcrums.jsx";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay.jsx";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox.jsx";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts.jsx";

const Product = () => {
    const { allproducts } = useContext(AuthContext);
    const { productId } = useParams();
    const product = allproducts.find((e) => e.id === productId);
   return(
    <>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </>
   );
}

export default Product