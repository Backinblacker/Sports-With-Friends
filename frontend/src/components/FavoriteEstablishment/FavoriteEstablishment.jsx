import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const FavoriteEstablishment = () => {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:5000/api/all_user_favorites",
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

  const handleUnfavorite = async (favoriteId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/user_favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFavorites(); // Fetch updated favorites list after unfavorite
    } catch (error) {
      console.error("Error in handleUnfavorite:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Favorites</h1>
          <div>
            {favorites.map((favorite) => (
              <ul key={favorite.id} className="favoritesList">
                <li>
                  <p><strong>Establishment Name:</strong> {favorite.establishment.establishment_name}</p>
                </li>
                <li>
                  <p><strong>Zip Code:</strong> {favorite.establishment.zip_code}</p>
                </li>
                <li>
                  <label><strong>Teams on TV:</strong></label>
                  <ul className="teamsList">
                    {favorite.establishment.teams.map((team) => (
                      <li key={team.id}>
                        {team.name}
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <button onClick={() => handleUnfavorite(favorite.id)}>
                    Unfavorite
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoriteEstablishment;
