import React from "react"
import data_products from "../../assets/data";
import Item from "../Item/Item";
import './RelatedProducts.css';

const RelatedProducts = () => {
   return(
    <>
      <div className="relatedproducts">
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {data_products.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_prices={item.new_prices} old_prices={item.old_prices}/>
            })}
        </div>
      </div>
    </>
   );
}

export default RelatedProducts