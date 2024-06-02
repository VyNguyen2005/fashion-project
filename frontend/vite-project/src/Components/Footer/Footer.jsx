import React from "react"
import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footer-logo">
                    <img src="../src/assets/logo.png" alt="" />
                    <p>MOJIE</p>
                </div>
                <ul className="footer-links">
                    <li>Company</li>
                    <li>Products</li>
                    <li>Offices</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <div className="footer-social-icon">
                    <div className="footer-icons-container">
                        <img src="../src/assets/fb.png" alt="" />
                    </div>
                    <div className="footer-icons-container">
                        <img src="../src/assets/ig.png" alt="" />
                    </div>
                    <div className="footer-icons-container">
                        <img src="../src/assets/x.png" alt="" />
                    </div>
                </div>
                <div className="footer-copyright">
                        <hr />
                        <p>Copyright &copy;2024 - All Right Reserved.</p>
                    </div>
            </div>
        </>
    );
}

export default Footer