import React, { useContext, useState } from "react";
import './CartItems.css';
import { AuthContext } from "../../Context/AuthContext";

const CartItems = () => {
    const { allproducts, cartItems, addToCart, removeFromCart, getTotalCartAmount, getShippingAmount, getTotalAmount } = useContext(AuthContext);

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const removeProduct = async (id) => {
        await fetch('http://localhost:7000/deleteproduct', {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
    }
        return (
            <>
                <div className="cartitems">
                    <div className="cartitems-format-main">
                        <p>Products</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <hr />
                    {allproducts.map((e) => {
                        if (cartItems[e.id] > 0) {
                            return (
                                <>
                                    <div>
                                        <div className="cartitems-format cartitems-format-main">
                                            <img src={e.image} alt="" className="cartitems-product" />
                                            <p>{e.name}</p>
                                            <p>${e.new_prices}</p>
                                            <div>
                                                <button onClick={() => { removeFromCart(e.id) }} className="btn-minus">-</button>
                                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                                <button onClick={() => { addToCart(e.id) }} className="btn-plus">+</button>
                                            </div>
                                            <p>${e.new_prices * cartItems[e.id]}</p>
                                            <img className="cartitems-remove-icon" src="../src/assets/remove.png" alt="" onClick={() => {removeProduct(e.id)}}/>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                        return null;
                    })}
                    <div className="cartitems-down">
                        <div className="cartitems-total">
                            <h1>Cart Total</h1>
                            <div className="cartitems-item-total">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cartitems-item-total">
                                <p>Shipping Fee</p>
                                <p>${getShippingAmount()}</p>
                            </div>
                            <hr />
                            <div className="cartitems-item-total">
                                <h3>Total</h3>
                                <h3>${getTotalAmount()}</h3>
                            </div>
                            <button>PROCEED TO CHECKOUT</button>
                        </div>
                        <div className="cartitems-promocode">
                            <p>If you have a promo code, Enter it here</p>
                            <div className="cartitems-promobox">
                                <input type="text" placeholder="Promo code" />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default CartItems