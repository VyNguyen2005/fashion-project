import React, { useState } from "react";
import './CSS/Signup.css'
import { Link } from "react-router-dom";

const Signup = () => {
   const [formData, setFormData] = useState({
      email: "",
      username: "",
      password: ""
   });

   const changeHandler = (e) => {
      e.preventDefault();
      setFormData({ ...formData, [e.target.name]: e.target.value });
   }
   const signup = async () => {
      console.log("Signup Function Excuted", formData);
      let responseData;
      await fetch('http://localhost:7000/signup', {
         method: "POST",
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData)
      }).then((res) => res.json()).then((data) => responseData = data);
      if (responseData.success) {
         localStorage.setItem("auth-token", responseData.token);
         window.location.replace("/login");
         alert("Registered Successfully");
      }
      else {
         alert(responseData.errors);
      }

   }
   return (
      <>
         <div className="signup">
            <div className="signup-container">
               <h1>Sign Up</h1>
               <div className="signup-fields">
                  <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email Address" />
                  <input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder="Your name" />
                  <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password" />
               </div>
               <button onClick={() => { signup() }}>Continue</button>
               <p className="signup-">Do you have an account?
                  <Link to="/login">Login here</Link>
               </p>
               <div className="signup-agree">
                  <input type="checkbox" name="" id="" />
                  <p>By continuing, i agree to the terms of use & privacy policy.</p>
               </div>
            </div>
         </div>
      </>
   );
}

export default Signup