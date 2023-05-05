import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
// Need
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewUsername, setReviewUsername] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useContext(AuthContext);
  // get reviews for that specific user(establishment)
  const fetchReviews = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5000/api/establishment_reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(response.data.reviews);
      setIsLoading(false);
    } catch (error) {
      console.log("Error in fetchReviews:", error);
    }
  };
  const addReview = async () => {
    try {
      let response = await axios.post(
        `http://127.0.0.1:5000/api/user_reviews`,
        {
          user_id: user_id,
          username: reviewUsername,
          text: reviewText,
          rating: reviewRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews([...reviews, response.data.text]);
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
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>User Reviews</h2>
          <ul className="reviewContainer">
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
          {!isReviewing ? (
            <button onClick={() => setIsReviewing(true)}>Add a review</button>
          ) : (
            <div>
              <label htmlFor="text">Username:</label>
              <input
                type="text"
                id="username"
                value={reviewUsername}
                onChange={(e) => setReviewUsername(e.target.value)}
              />
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
              <button onClick={addReview}>Submit</button>
              <button onClick={() => setIsReviewing(false)}>Cancel</button>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Reviews;