import React, { useState } from "react"
import './Navbar.css';

const Navbar = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }
    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        window.location.href = "http://localhost:5173/";
    }
    return (
        <>
            <div className="navbar">
                <img className="logo-admin" src="../src/assets/logo_admin.png" alt="" />
                <img className="admin-profile" src="../src/assets/admin_profile.png" alt="" onClick={toggleMenu}/>

                <div className={`sub-menu-wrap ${isOpenMenu ? 'open-menu' : ''}`} id="subMenu">
                    <div className="sub-menu">
                        <div className="user-info">
                            <img className="admin-profile" src="../src/assets/admin_profile.png" alt="" />
                            <h3>Admin</h3>
                        </div>
                        <hr className="line" />
                        <div className="sub-menu-link" onClick={handleLogout}>
                            <img className="log-out" src="../src/assets/logout.png" alt="" />
                            <p>Log out</p>
                            <img className="angle-right" src="../src/assets/angle-right.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar