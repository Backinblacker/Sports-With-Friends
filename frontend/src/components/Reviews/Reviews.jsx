import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import EditReviews from "./EditReviews";

const Reviews = ({ user_id }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [reviewUsername, setReviewUsername] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, token } = useContext(AuthContext);

  // get reviews for that specific user(establishment)
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/establishment_reviews/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(response.data)) {
        setReviews(
          response.data.map((review) => ({
            reviewId: review.review_id,
            text: review.text,
            reviewer: review.reviewer,
            rating: review.rating,
            date: new Date(review.date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' +
                  new Date(review.date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          }))
        );
      } else {
        // If the response is only one review, this will change it into an array so that it won't mess with isLoading.
        setReviews([
          {
            reviewId: response.data.review_id,
            text: response.data.text,
            reviewer: response.data.reviewer,
          },
        ]);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("Error in fetchReviews:", error);
    }
  };

  const addReview = async () => {
    if (!isReviewing) {
      return;
    }
    try {
      const currentDate = new Date();
      const reviewData = {
        reviewee_id: user_id,
        text: reviewText,
        rating: reviewRating,
        date: currentDate.toISOString(),
      };
      const response = await axios.post(
        `http://127.0.0.1:5000/api/user_reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newReview = {
        reviewId: response.data.review_id,
        text: response.data.text,
        reviewer: response.data.reviewer,
        rating: response.data.rating,
        date: new Date(response.data.date).toLocaleDateString([], {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) +
          ' ' +
          new Date(response.data.date).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }),
      };
      setReviews([...reviews, newReview]);
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
    fetchReviews();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this Review?");
      if (!confirmed) {
        return;
      }

      await axios.delete(`http://127.0.0.1:5000/api/user_reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchReviews();
      setIsReviewing(false);
    } catch (error) {
      console.log("Error in deleteReview:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>User Reviews:</h2>
          <ul className="review-container">
            {reviews.map((review, index) => (
              <li key={index}>
                <span className="reviewer-username">{review.reviewer.username}</span>: {review.text}
                <br />
                Rating: {review.rating}
                <br />
                Date: {review.date}
                <br />
                {user && user.username === review.reviewer.username && (
                  <>
                    {editReviewId === review.reviewId ? (
                      // Use editReviewId to check if the current review is being edited
                      <EditReviews
                        reviewId={review.reviewId}
                        token={token}
                        setIsReviewing={setIsReviewing}
                        setReviews={setReviews}
                        user={user}
                        deleteReview={deleteReview}
                      />
                    ) : (
                      <>
                        <button onClick={() => setEditReviewId(review.reviewId)}>Edit</button>
                        <button onClick={() => deleteReview(review.reviewId)}>Delete</button>
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          {isReviewing ? (
            <div className="review-form">
              <label htmlFor="text">Review text:</label>
              <input
                type="text"
                id="text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                id="rating"
                min="1"
                max="5"
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
              />
              <button className="review-form-btn" onClick={addReview}>
                Submit
              </button>
              <button className="review-form-btn" onClick={() => setIsReviewing(false)}>
                Cancel
              </button>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          ) : (
            <button onClick={() => setIsReviewing(true)}>Add a Review</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;