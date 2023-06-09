import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const CheckInEvent = ({ eventId }) => {
  const [user, token] = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [checkedInEvents, setCheckedInEvents] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCheckedInEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:5000/api/user_checked_in_events/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false);
        setCheckedInEvents(response.data);
        
        const hasCheckedIn = response.data.some(
          (item) => item.event_id == eventId && item.favorited_by_id == user.id
        );
        
        setIsCheckIn(hasCheckedIn);
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An unknown error occurred.");
        }
      }
    };

    fetchCheckedInEvents();
  }, [eventId, user.id, token]);

  const checkInEvent = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        "http://127.0.0.1:5000/api/user_favorite_event",
        {
          event_id: eventId,
          favorited_by_id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setIsCheckIn(true);
      setCheckedInEvents((prevEvents) => [eventId, ...prevEvents]);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      {isCheckIn ? (
        <p>You have checked in to this event.</p>
      ) : (
        <>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button onClick={checkInEvent} disabled={isLoading} className="editButton">
              Check-In
            </button>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
      {checkedInEvents && checkedInEvents.length > 0 && (
        <p>
          <Link to={`/eventsbyuser/${user.id}`}>View Checked-in Events</Link>
        </p>
      )}
    </div>
  );
};

export default CheckInEvent;
