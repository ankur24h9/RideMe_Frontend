import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/welcome";
import Vehicle from "./pages/vehicle";
import UpdatePassword from "./pages/UpdatePassword";
import Captionsignup from "./pages/captionsignup";
import Captionlogin from "./pages/captionlogin";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Captiondashboard from "./pages/captiondashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/captionlogin" element={<Captionlogin/>} />
        <Route path="/captionsignup" element={<Captionsignup />} />
        <Route path="/captiondashboard" element={<Captiondashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

