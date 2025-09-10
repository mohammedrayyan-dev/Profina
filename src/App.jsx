import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Manage from "./pages/Manage";
import { Toolbar } from '@mui/material';

function App() {

  return (
    <Router>
      <Navbar />

      <Toolbar />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Profile" element={<Profile />}/>
        <Route path="/Manage" element={<Manage />}/>
    </Routes>
    </Router>
  )
}

export default App
