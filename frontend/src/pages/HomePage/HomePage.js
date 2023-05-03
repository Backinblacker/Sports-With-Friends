import React from "react";
import useAuth from "../../hooks/useAuth";
import soccer from '../../assets/blur_soccer_stadium.jpg'

const HomePage = () => {
  const [user, token] = useAuth();
  const auth = "Bearer " + token;

  return (
    <main>
      <div className="image-container">
        <img className="stadium-image" src={soccer} alt='blurry soccer stadium'/>
        <div className="text-overlay">
          <h1 className="title">Welcome to Sport With Friends</h1>
          <div>
            <p>What are you to do when you don't live where your favorite team plays?</p>
            <p>Sports With Friends is here to help. We specialize in helping fans like yourself find their people.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
