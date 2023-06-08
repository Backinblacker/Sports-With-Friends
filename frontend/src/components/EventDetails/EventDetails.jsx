import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import CheckInEvent from '../Events/CheckInForEvent';
import { useParams, Link } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, token] = useAuth();
  const [favoritedByUsers, setFavoritedByUsers] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:5000/api/eventdetails/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvent(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    const fetchFavoritedByUsers = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:5000/api/event/${eventId}/favorited_users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavoritedByUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };    

    fetchEventDetails();
    fetchFavoritedByUsers();
  }, [eventId, token]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Event Details</h1>
          <p>
            <strong>Event Name:</strong> {event.text}
          </p>
          <p>
            <strong>Event Details:</strong> {event.event_image}
          </p>
          <p>
          <strong>Checked-in Users:</strong>{' '}
          {favoritedByUsers.length > 0 ? (
            favoritedByUsers.map((user) => (
              <span key={user.id}>
                <Link to={`/user/${user.id}`}>{user.username}</Link>{' '}
              </span>
            ))
          ) : (
            'None'
          )}
          </p>
          <CheckInEvent eventId={eventId} />
        </div>
      )}
    </div>
  );
};

export default EventDetails;
