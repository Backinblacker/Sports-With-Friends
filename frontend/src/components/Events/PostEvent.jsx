import React, { useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PostEvent = () => {
  const [user, token] = useAuth();
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [teamName, setTeamName] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  const fetchEvents = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5000/api/eventsbyuser/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error in fetchEvents:", error);
    }
  };

  const addEvent = async () => {
    try {
      console.log("Add event clicked");
      let response = await axios.post(
        `http://127.0.0.1:5000/api/events`,
        {
          text: eventText,
          event_image: eventImage,
          timestamp: currentDateTime,
          // team_id: teamId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchEvents()
      setIsReviewing(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Establishment's Events</h2>
          <ul className="reviewContainer">
          {events && events.map((event, index) => 
            <li key={index}>{event.text} {event.event_image}</li>
          )}
          </ul>
          {!isReviewing ? (
            <button onClick={() => setIsReviewing(true)}>Add an Event</button>
          ) : (
            <div>
              <label htmlFor="text">Event Description:</label>
              <input
                type="text"
                id="text"
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
              />
              <label htmlFor="event_image">Event Poster:</label>
              <input
                type="text"
                id="event_image"
                value={eventImage}
                onChange={(e) => setEventImage(e.target.value)}
              />
              {/* <label htmlFor="team_name">Team Name:</label>
              <input
                type="text"
                id="team_name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              /> */}
              <button onClick={addEvent}>Submit</button>
              <button onClick={() => setIsReviewing(false)}>Cancel</button>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostEvent;