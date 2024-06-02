import React, { useEffect, useState } from "react";
import './Popular.css';
import Item from "../Item/Item";

const Popular = () => {
   const [dataproducts, setDataProducts] = useState([]);
   useEffect(() => {
     fetch("http://localhost:7000/popularinwomen")
         .then((res) => res.json())
         .then((data) => setDataProducts(data));
   }, []);
   return(
    <>
      <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popular-item">
            {dataproducts.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_prices={item.new_prices} old_prices={item.old_prices}/>
            })}
        </div>
      </div>
    </>
   );
}

export default Popular