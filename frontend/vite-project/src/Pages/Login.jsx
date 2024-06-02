import React, { useState } from "react";
import '../Pages/CSS/Login.css';
import { Link } from "react-router-dom";

const Login = () => {
   const [formData, setFormData] = useState({
      email: "",
      password: ""
   });
   const changeHandler = (e) => {
      e.preventDefault();
      setFormData({ ...formData, [e.target.name]: e.target.value });
   }
   const login = async () => {
      console.log("Login Function Excuted", formData);
      let responseData;
      await fetch('http://localhost:7000/login', {
         method: "POST",
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
      }).then((res) => res.json()).then((data) => responseData = data);
      if (responseData.success) {
         localStorage.setItem('auth-token', responseData.token);
         if (formData.email === "adminaccount@gmail.com" && formData.password === "123456") {
            window.location.href = "http://localhost:5174/"
         }
         else {
            window.location.replace("/");
         }
         alert("Login Successfully");
      }
      else {
         alert(responseData.errors);
      }

   }
   return (
      <>
         <div className="login">
            <div className="login-container">
               <h1>Login</h1>
               <div className="login-fields">
                  <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email Address" autoComplete="off" />
                  <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password" />
               </div>
               <button onClick={() => { login() }}>Continue</button>
               <p className="login-login">Don't you have an account?
                  <Link to="/signup">Register here</Link>
               </p>
               <div className="login-agree">
                  <input type="checkbox" name="" id="" />
                  <p>By continuing, i agree to the terms of use & privacy policy.</p>
               </div>
            </div>
         </div>
      </>
   );
}

export default Login