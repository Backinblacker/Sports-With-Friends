import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const FavoritesPage = () => {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:5000/api/user_favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error in fetchFavorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        // Need
        <div className="container">
          <h1>Favorites</h1>
          <div className="favoritesList">
            <ul className="favorites-grid">
              {favorites.map((favorite) => (
                <li key={favorite.user_id}>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;