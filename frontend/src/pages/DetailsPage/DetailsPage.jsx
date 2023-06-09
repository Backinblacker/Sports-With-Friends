import React, { useState, useEffect, useContext } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Reviews from '../../components/Reviews/Reviews'
import EditReviews from '../../components/Reviews/EditReviews';
import { useParams, Link } from 'react-router-dom';
import { TicketDetailed, Calendar2Event } from 'react-bootstrap-icons';

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
          <div key={user_id} className="profile">
            <h2>{establishmentDetails.establishment_name}</h2>
            <div className="profile-column">
              <div className="profile-item">
                <label>Opens:</label>
                <p className='border-profile-b'>{establishmentDetails.opening_time}</p>
                <label>Closes:</label>
                <p className='border-profile-b'>{establishmentDetails.closing_time}</p>
                <label>Menu:</label>
                <p className='border-profile-b'>{establishmentDetails.menu_url}</p>
                <label>Socials:</label>
                <p className='border-profile-b'>{establishmentDetails.social_media}</p>
                <label>Entertainment:</label>
                <p className='border-profile-b'>{establishmentDetails.entertainment}</p>
              </div>
            </div>
            <div className='editButton'>
              {isFavorite ? (
                <button onClick={handleFavorite}>
                  Unfavorite
                </button>
              ) : (
                <button onClick={handleFavorite}>
                  Favorite
                </button>
              )}
            </div>
            <Link to="/favorites">View Favorites</Link>
            <br/> 
            <div className='profile'>
            <h2> <TicketDetailed /> Upcoming Events:</h2>
              <div>
                {establishmentEvents.length > 0 ? (
                  <div className='resultsContainer'>
                    {/* need to align ticket icon */}
                    {establishmentEvents.map((event) => (
                      <div key={event.id} className="resultsCard">
                      <Link to={`/eventdetails/${event.id}`}>
                        <div>
                          <div className="iconContainer">
                            <Calendar2Event className="eventIcon" />
                          </div>
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
            </div>
            <br/>
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
