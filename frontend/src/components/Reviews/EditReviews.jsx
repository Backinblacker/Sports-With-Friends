import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditReviews = ({ reviewId, token, setIsReviewing, setReviews, user, deleteReview }) => {
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/user_reviews/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reviewData = response.data;
        setNewText(reviewData.text);
        setNewRating(reviewData.rating);
      } catch (error) {
        console.log("Error in fetchReviewData:", error);
      }
    };

    fetchReviewData();
  }, [reviewId, token]);

  const editReview = async () => {
    const requestData = {
      text: newText,
      rating: newRating,
      date: new Date().toLocaleString(),
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/user_reviews/${reviewId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedReview = {
        text: response.data.text,
        rating: response.data.rating,
        date: response.data.date,
      };

      setReviews((prevReviews) => {
        const updatedReviews = [...prevReviews];
        const reviewIndex = updatedReviews.findIndex((review) => review.review_id === reviewId);

        if (reviewIndex !== -1) {
          updatedReviews[reviewIndex] = {
            ...updatedReviews[reviewIndex],
            ...updatedReview,
          };
        }

        return updatedReviews;
      });

      setIsEditing(false);
      setIsReviewing(false);
    } catch (error) {
      console.log("Error in editReview:", error);
    }
};


  return (
    <div>
      {!isEditing ? (
        <div>
          <p>Review successfully edited!</p>
          <button onClick={() => setIsReviewing(false)}>OK</button>
        </div>
      ) : (
        <div>
          <label htmlFor="newText">New Review Text:</label>
          <input
            type="text"
            id="newText"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <label htmlFor="newRating">New Review Rating:</label>
          <input
            type="number"
            id="newRating"
            min="1"
            max="5"
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)}
          />
          <button onClick={()=>editReview()}>Save</button>
          <button onClick={() => deleteReview(reviewId)}>Delete</button>
        </div>
      )}
    </div>
  );  
};

export default EditReviews;
