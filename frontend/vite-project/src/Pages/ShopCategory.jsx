import React, { useContext, useState } from "react";
import '../Pages/CSS/ShopCategory.css';
import { AuthContext } from "../Context/AuthContext";
import Item from "../Components/Item/Item";
import { useEffect } from "react";

const ShopCategory = (props) => {
    const { allproducts } = useContext(AuthContext);
    const [visibleProducts, setVisibleProducts] = useState(8);
    const [scrollPosition, setScrollPosition] = useState(0);

    const exploreMoreProduct = (e) => {
        e.preventDefault();
        setScrollPosition(window.scrollY);
        setVisibleProducts(prevProduct => {
            const nextProduct = prevProduct + 4;
            return Math.min(nextProduct, allproducts.length);
        });
    }
    useEffect(() => {
        window.scrollTo(0, scrollPosition);

    }, [visibleProducts, scrollPosition]);

    return (
        <>
            <div className="shop-category">
                <img className="shopcategory-banner" src={props.banner} alt="" />
                <div className="shopcategory-indexSort">
                    <p>
                        <span>Showing 1-{Math.min(visibleProducts, allproducts.length)}</span> out of {allproducts.length} products
                    </p>
                    <div className="shopcategory-sort">
                        Sort by <img src="../src/assets/dropdown.png" alt="" />
                    </div>
                </div>
                <div className="shopcategory-products">
                   {allproducts.map((item, i) => {
                    if(props.category == item.category){
                        return <Item key={i} id={item.id} name={item.name} image={item.image} category={item.category} new_prices={item.new_prices} old_prices={item.old_prices}/>
                    }
                    else{
                        return null;
                    }
                   })}
                </div>
                <div className="shopcategory-loadmore">
                    <button onClick={exploreMoreProduct}>Explore more</button>
                </div>
            </div>
        </>
    );
}

export default ShopCategory