import React, { useContext, useRef, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
   const [menu, setMenu] = useState("shop");
   const { getTotalCartItems } = useContext(AuthContext);
   const menuRef = useRef();

   const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
   }
   return (
      <>
         <div className="navbar">
            <div className="nav-logo">
               <a href="#">
                  <img src="../src/assets/logo.png" alt="" />
               </a>
               <p>MOJIE</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src="../src/assets/toggle.png" alt="" />
            <ul ref={menuRef} className="nav-menu">
               <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to="/">Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
               <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to="/mens">Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
               <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to="/womens">Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
               <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to="/kids">Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
               {localStorage.getItem('auth-token')
                  ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                  : <Link className="login-link" to="/login">
                     Login
                  </Link>}
               <Link to="/cart"><img src="../src/assets/cart.png" alt="" /></Link>
               <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
         </div>
      </>
   );
}

export default Navbar