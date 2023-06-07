import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const CheckedInEvents = () => {
  const [user, token] = useAuth();
  const auth = "Bearer " + token;
  const [checkedInEventsData, setCheckedInEventsData] = useState([]);

  useEffect(() => {
    const fetchCheckedInEvents = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/user_checked_in_events/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCheckedInEventsData(response.data);
      } catch (error) {
        console.error("Error fetching checked-in events:", error);
      }
    };

    fetchCheckedInEvents();
  }, [user.id, token]);

  return (
    <div>
      <h2>Checked-in Events</h2>
      {checkedInEventsData.map((event) => {
        return (
            // need styling
          <div key={event.id}>
            <h3>{event.event.text}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CheckedInEvents;
