import React, { useState } from "react";
import './Hero.css';

const Hero = () => {
    return (
        <>
            <div className="hero">
                <div className="hero-left">
                    <h2>NEW ARRIVAL ONLY</h2>
                    <div>
                        <div className="hero-hand-icon">
                            <p>new</p>
                            <img src="../src/assets/hand.png" alt="" />
                        </div>
                        <p>collections</p>
                        <p>for everyone</p>
                    </div>
                    <div className="hero-latest-btn">
                        <div>Latest Collection</div>
                        <img src="../src/assets/next.png" alt="" />
                    </div>
                </div>
                <div className="hero-right">
                   <img src="../src/assets/model.png" alt="" />
                </div>
            </div>
        </>
    );
}

export default Hero