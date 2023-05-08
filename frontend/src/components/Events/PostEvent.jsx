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
          // need to be able to select which team the event coincides with. 
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

  const editEvent = async (eventId, newText, newImageUrl) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/eventdetails/${parseInt(eventId)}`,
        {
          text: newText,
          event_image: newImageUrl,
          // need to be able to edit the team that is selected
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchEvents();
      setIsReviewing(false);
    } catch (error) {
      console.log("Error in editEvent:", error);
    }
  };
  
  const deleteEvent = async (eventId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this event?");
      if (!confirmed) {
        return;
      }

      await axios.delete(`http://127.0.0.1:5000/api/eventdetails/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.log("Error in deleteEvent:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="profile">
          <h2>Upcoming Events</h2>
          <ul className="events">
          {events && events.map((event, index) => (
            <li key={index} className="event-row">
              <div className="event-info">
                <p className="event-label">Event Name:</p>
                <p>{event.text}</p>
                <p className="event-label">Event Details:</p>
                <p>{event.event_image}</p>
              </div>
              <div className="event-actions">
              <button onClick={() => {
                setEventText(event.text);
                setEventImage(event.event_image);
                // need to be able to edit the team here
                setIsReviewing(true);
              }}>Edit</button>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
              </div>
            </li>
          ))}
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
              {/* <label htmlFor="team_id">Team ID:</label>
                  <input
                    type="text"
                    id="team_id"
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                  />*/}
              <button onClick={editEvent}>Submit</button>
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