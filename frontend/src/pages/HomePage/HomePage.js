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
          <div>
            <p className="title">What are you to do when you don't live where your favorite team plays?</p>
            <br/>
            <p className="title">Sports With Friends is here to help. We specialize in helping fans like yourself find their people.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
