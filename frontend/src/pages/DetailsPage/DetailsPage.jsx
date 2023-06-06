import React, { useState, useEffect, useContext } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Reviews from '../../components/Reviews/Reviews'
import EditReviews from '../../components/Reviews/EditReviews';
import { useParams, Link } from 'react-router-dom';
import { TicketDetailed } from 'react-bootstrap-icons';

const DetailsPage = () => {
  const { user_id } = useParams();
  const [establishmentDetails, setEstablishmentDetails] = useState({});
  const [establishmentEvents, setEstablishmentEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [user, token] = useAuth()
  const [eventId, setEventId] = useState(null);

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

    const fetchEvents = async () => {
      try {
        const eventResponse = await axios.get(`http://127.0.0.1:5000/api/eventsbyuser/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEstablishmentEvents(eventResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchEstablishmentDetails();
    fetchEvents();
  }, [user_id, token]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        const response = await axios.delete(`http://127.0.0.1:5000/api/user_favorites/${establishmentDetails.favorite_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFavorite(false);
      } else {
        const response = await axios.post('http://127.0.0.1:5000/api/user_favorites', {
          establishment_id: user_id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const reviewId = reviews.find((review) => review.user_id === user_id)?.id;
  
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
            {isFavorite ? (
              <button onClick={handleFavorite}>
                Unfavorite
              </button>
            ) : (
              <button onClick={handleFavorite}>
                Favorite
              </button>
            )}
            <Link to="/favorites">View Favorites</Link> 
            {/* need card style to click on it and take user to event details page */}
            <div className="resultsContainer">
              {establishmentEvents.length > 0 ? (
                <div>
                  <h2> <TicketDetailed /> Upcoming Events:</h2>
                  {establishmentEvents.map((event) => (
                    <div key={event.id} className="resultsCard" >
                      {/* When this goes somewhere put this in the div onClick={() => handleEventClick(event.id)} */}
                      <Link to={`/eventdetails/${event.id}`}>
                        <div>
                          <h3>Event: {event.text}</h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No events scheduled at this time.</p>
              )}
            </div>
            <Reviews user_id={user_id} />
            {user && user.id === user_id && (
              <EditReviews
                reviewId={reviewId}
                token={token}
                setIsReviewing={setIsReviewing}
                setReviews={setReviews}
                user={user}
              />
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default DetailsPage;
