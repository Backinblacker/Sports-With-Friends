import React, { useState, useEffect } from "react";
import axios from "axios";

const EditEvent = ({ eventId, token, fetchEvents, setIsReviewing, setSelectedEventId }) => {
  const [newText, setNewText] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/eventdetails/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const eventData = response.data;
        setNewText(eventData.text);
        setNewImageUrl(eventData.event_image);
      } catch (error) {
        console.log("Error in fetchEventData:", error);
      }
    };

    fetchEventData();
  }, [eventId, token]);

  const editEvent = async () => {
    const requestData = {
        text: newText,
        event_image: newImageUrl,
      };
    console.log('Request data:', requestData);
    try {
      let response=await axios.put(
        `http://127.0.0.1:5000/api/eventdetails/${eventId}`,
        {
          text: newText,
          event_image: newImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      fetchEvents();
      setIsEditing(false);
      setIsReviewing(false);
    } catch (error) {
      console.log("Error in editEvent:", error);
    }
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <p>Event successfully edited!</p>
          <button onClick={() => setSelectedEventId(null)}>OK</button>
        </div>
      ) : (
        <div>
          <label htmlFor="newText">New Event Description:</label>
          <textarea
            className="editInput"
            type="text"
            id="newText"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <label htmlFor="newImageUrl">New Event Poster:</label>
          <textarea
            className="editInput"
            type="text"
            id="newImageUrl"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
          <button onClick={editEvent}>Save</button>
        </div>
      )}
    </div>
  );
};

export default EditEvent;
