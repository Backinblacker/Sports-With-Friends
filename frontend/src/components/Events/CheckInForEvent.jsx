import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const CheckInEvent = ({ eventId }) => {
  const [user, token] = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [checkedInEvents, setCheckedInEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const checkInEvent = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        "http://127.0.0.1:5000/api/user_favorite_event",
        {
          event_id: eventId,
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
      {!isCheckIn ? (
        <div>
          <button onClick={checkInEvent} disabled={isLoading}>
            Check-In
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      ) : (
        <p>You have checked in to this event.</p>
      )}
      {checkedInEvents.length > 0 && (
        <p>
          <Link to="/events">View Checked-in Events</Link>
        </p>
      )}
    </div>
  );
};

export default CheckInEvent;
