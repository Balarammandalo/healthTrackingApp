// // import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Index.jsx'
import Signup from "./components/SIgnUpPage/Signup/Index.jsx"
import Signup2 from "./components/SIgnUpPage/Signup2/Index.jsx"
import Signup3 from "./components/SIgnUpPage/Signup3/Index.jsx"
import Active from "./components/ActiveDetails/Index.jsx"
import DashBoard from "./components/DashBoard/Index.jsx"
import Login from "./components/LoginPage/Index.jsx";
import Protect from "./components/ProtectRoute/Protect.jsx"
import { SignupProvider } from './Context/SignupProvider.jsx'
import './App.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Protect>
              <Home />
            </Protect>
          } />

          <Route path="/dashboard" element={
            <Protect>
              <DashBoard />
            </Protect>
          } />

          <Route path="/signup" element={<Signup />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/signup3" element={<Signup3 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activeDetails" element={<Active />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App