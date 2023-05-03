// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import soccer from './assets/blur_soccer_stadium.jpg'
// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
// import EstablishmentPage from "./pages/EstablishmentPage/EstablishmentPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

function App() {
  return (
    <div>
      <img className="title-image" src={soccer} alt='blurry soccer stadium'/>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/:user_id" element={<UserProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
