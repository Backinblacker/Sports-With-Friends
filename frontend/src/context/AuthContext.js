import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return {
    username: user.username,
    id: user.id,
    first_name: user.first_name,
    //Add is_establishment
    is_establishment: user.is_establishment,
    establishment_name: user.establishment_name,
    opening_time: user.opening_time,
    closing_time: user.closing_time,
    menu_url: user.menu_url,
    specials: user.specials,
    social_media:user.social_media,
    entertainment: user.entertainment,
    teams:user.teams
  };
}

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://127.0.0.1:5000/api/auth";
  const userToken = JSON.parse(localStorage.getItem("token"));
  const decodedUser = userToken ? jwtDecode(userToken) : null;
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (registerData) => {
    try {
      let finalData = {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        first_name: registerData.first_name,
        last_name: registerData.last_name,
        is_establishment: registerData.is_establishment,
      };
      let response = await axios.post(`${BASE_URL}/register`, finalData);
      if (response.status === 201) {
        console.log("Successful registration! Log in to access token");
        setIsServerError(false);
        navigate("/login");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const registerEstablishmentUser = async (registerData) => {
    try {
      let finalData = {
        establishment_name: registerData.establishment_name,
        opening_time: registerData.opening_time,
        closing_time: registerData.closing_time,
        menu_url: registerData.menu_url,
        specials: registerData.specials,
        social_media:registerData.social_media,
        entertainment: registerData.entertainment,
        teams: registerData.teams
      };
      let response = await axios.put(`http://127.0.0.1:5000/api/user/${user.id}/`, finalData);
      if (response.status === 201) {
        console.log("Successful registration! Log in to access token");
        setIsServerError(false);
        navigate(`/`);
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.access));
        setToken(JSON.parse(localStorage.getItem("token")));
        let loggedInUser = jwtDecode(response.data.access);
        setUser(setUserObject(loggedInUser));
        setIsServerError(false);
        if (loggedInUser.is_establishment !==0 && loggedInUser.is_establishment !==null)
          {navigate("/home")}
        else{  
        navigate("/")};
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.response.data);
      setIsServerError(true);
      navigate("/register");
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    registerEstablishmentUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
