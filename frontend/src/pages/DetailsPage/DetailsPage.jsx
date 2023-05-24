import React, { useState, useEffect, useContext } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Reviews from '../../components/Reviews/Reviews'
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { user_id } = useParams();
  const [establishmentDetails, setEstablishmentDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEstablishmentDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/userinfo/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEstablishmentDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchEstablishmentDetails();
  }, [user_id, token]);

  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div key={user_id} className="need">
            <h2>{establishmentDetails.establishment_name}</h2>
            <p>Opens: {establishmentDetails.opening_time}</p>
            <p>Closes: {establishmentDetails.closing_time}</p>
            <p>Menu: {establishmentDetails.menu_url}</p>
            <p>Socials: {establishmentDetails.social_media}</p>
            <p>Other Entertainment: {establishmentDetails.entertainment}</p>
            {/* <Reviews establishmentId={user_id} /> */}
          </div>
        </>
      )}
    </main>
  );
};

export default DetailsPage;
