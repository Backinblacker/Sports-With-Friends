import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Calendar2Event } from "react-bootstrap-icons";

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
      <div className="resultsContainer">
        {checkedInEventsData.map((event) => {
          return (
            <div key={event.id} className="resultsCard">
              <Link to={`/eventdetails/${event.event.id}`}>
                <div>
                  <div className="iconContainer">
                    <Calendar2Event className="eventIcon" />
                  </div>
                  <h3 className="eventText">{event.event.text}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckedInEvents;
