import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from '../src/Components/Navbar/Navbar.jsx';
import Shop from '../src/Pages/Shop.jsx';
import Signup from '../src/Pages/SignUp.jsx';
import Login from "./Pages/Login.jsx";
import ShopCategory from './Pages/ShopCategory.jsx';
import men_banner from '../src/assets/men-banner.avif';
import women_banner from '../src/assets/women_banner.jpg';
import kid_banner from '../src/assets/kid_banner.jpg';
import Footer from "./Components/Footer/Footer.jsx";
import Product from "./Pages/Product.jsx";
import Cart from "./Pages/Cart.jsx";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
            <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={<Product/>}/>
            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App