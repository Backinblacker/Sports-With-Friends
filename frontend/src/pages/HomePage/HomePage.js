import React from "react";
import useAuth from "../../hooks/useAuth";
import bar from "../../assets/Rainy_bar.jpg"

const HomePage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;

  return (
    <main>
      <h1 className= "title">Welcome to Sport With Friends</h1>
      <img className="bar-image" src={bar} alt='rainy bar'/>
    </main>
  )
};
export default HomePage;
