import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter } from "react-router-dom"
import Admin from "./Pages/Admin/Admin"


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Admin/>
      </BrowserRouter>
    </>
  )
}

export default App
