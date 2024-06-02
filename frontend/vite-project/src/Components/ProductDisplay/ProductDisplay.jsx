import React, { useContext, useState } from "react"
import './ProductDisplay.css';
import { AuthContext } from "../../Context/AuthContext";

const ProductDisplay = (props) => {
    const [number, setNumber] = useState(1);
    const [selectedSize, setSelectedSize] = useState('S');

    const handlePlusNumber = () => {
        setNumber(prevNumber => prevNumber + 1);
    }
    const handleMinusNumber = () => {
        if (number > 1) {
            setNumber(prevNumber => prevNumber - 1)
        }
    }
    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    }
    const { addToCart } = useContext(AuthContext);

    const { product } = props;
    return (
        <>
            <div className="productdisplay">
                <div className="productdisplay-left">
                    <div className="productdisplay-img-list">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>
                    <div className="productdisplay-img">
                        <img className="productdisplay-main-img" src={product.image} alt="" />
                    </div>
                </div>
                <div className="productdisplay-right">
                    <h1>{product.name}</h1>
                    <div className="productdisplay-right-star">
                        <img src="../src/assets/star.png" alt="" />
                        <img src="../src/assets/star.png" alt="" />
                        <img src="../src/assets/star.png" alt="" />
                        <img src="../src/assets/star.png" alt="" />
                        <img src="../src/assets/star_dull.png" alt="" />
                        <p>(122)</p>
                    </div>
                    <div className="productdisplay-right-prices">
                        <div className="productdisplay-right-prices-new">${product.new_prices}</div>
                        <div className="productdisplay-right-prices-old">${product.old_prices}</div>
                    </div>
                    <div className="productdisplay-right-description">
                        <p>It is under TEN dollars!! The quality is UNREAL too!! I am so impressed!
                            The material is thick and in no way see through, making this the perfect everyday casual tee!!</p>
                    </div>
                    <div className="productdisplay-right-sizes">
                        <h3>Select size:</h3>
                        <div className="productdisplay-right-size">
                            <div onClick={() => handleSizeSelection('S')} className={selectedSize === 'S' ? 'selected' : ''}>S</div>
                            <div onClick={() => handleSizeSelection('M')} className={selectedSize === 'M' ? 'selected' : ''}>M</div>
                            <div onClick={() => handleSizeSelection('L')} className={selectedSize === 'L' ? 'selected' : ''}>L</div>
                            <div onClick={() => handleSizeSelection('XL')} className={selectedSize === 'XL' ? 'selected' : ''}>XL</div>
                        </div>
                    </div>
                    <div className="productdisplay-right-amounts">
                        <h3>Amount:</h3>
                        <div className="productdisplay-right-amount">
                            <div onClick={handleMinusNumber} className="btn-minus">-</div>
                            <div className="amount">{number}</div>
                            <div onClick={handlePlusNumber} className="btn-plus">+</div>
                        </div>
                    </div>
                    <button onClick={() => {addToCart(product.id)}}>Add to cart</button>
                </div>
            </div>
        </>
    );
}

export default ProductDisplay