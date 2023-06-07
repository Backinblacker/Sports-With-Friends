import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import CheckInEvent from '../Events/CheckInForEvent';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, token] = useAuth();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
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

    fetchEventDetails();
  }, [eventId, token]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Event Details</h1>
          <p><strong>Event Name:</strong>{event.text}</p>
          <p><strong>Event Details:</strong>{event.event_image}</p>
          <CheckInEvent eventId={eventId} />
        </div>
      )}
    </div>
  );
};

export default EventDetails;
