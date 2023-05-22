// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import bar from "./assets/Rainy_bar.jpg";

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
import EventsPage from "./pages/EventsPage/EventsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ResultsList from "./components/ResultsList/ResultsList";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

function App() {
  return (
    <div>
      <img className="title-image" src={bar} alt="rainy bar"/>
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
        <Route path="/eventsbyuser/:user_id" element={<EventsPage />} />
        <Route path="/favorites" element={<FavoritesPage />}/>
        <Route path="/search" element={<SearchPage />}/>
        <Route path="/details/:user_id" element={<DetailsPage />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
