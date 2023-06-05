import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import EditReviews from "./EditReviews";

const Reviews = ({ user_id }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewing, setIsReviewing] = useState(null);
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
        setReviews(response.data.map((review) => ({ reviewId: review.review_id, text: review.text, reviewer: review.reviewer, rating: review.rating, date: review.date.toLocaleString() })));
      } else {
        // If the response is only one review, this will change it into an array so that it won't mess with isLoading.
        setReviews([{ reviewId: response.data.review_id, text: response.data.text, reviewer: response.data.reviewer }]);
      }
  
      setIsLoading(false);
    } catch (error) {
      console.log("Error in fetchReviews:", error);
    }
  };
  
  const addReview = async () => {
    try {
      const currentDate = new Date();
      const reviewData = {
        reviewee_id: user_id,
        username: reviewUsername,
        text: reviewText,
        rating: reviewRating,
        date: currentDate.toLocaleString(),
      };
      let response = await axios.post(
        `http://127.0.0.1:5000/api/user_reviews`,
        reviewData,
        {
          headers:{
            Authorization: `Bearer ${token}`
          },
        }
      );
      setReviews([
        ...reviews,
        {
          text: response.data.text,
          reviewer: response.data.reviewer,
          rating: response.data.rating,
          date: response.data.date.toLocaleString(),
        },
      ]);
      console.log(response.data.date)
      setIsReviewing(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unknown error occured.");
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
          <h2>User Reviews</h2>
          <ul className="reviewContainer">
            {reviews.map((review, index) => (
              <li key={index}>
                {review.reviewer.username}: {review.text}
                <br />
                Rating: {review.rating}
                <br />
                Date: {review.date}
                <br />
                {user && user.username === review.reviewer.username && (
                  <>
                    {isReviewing && (
                      <EditReviews
                        reviewId={review.reviewId}
                        token={token}
                        setIsReviewing={setIsReviewing}
                        setReviews={setReviews}
                        user={user}
                        deleteReview={deleteReview}
                      />
                    )}
                    {!isReviewing && (
                      <>
                        <button onClick={() => setIsReviewing(review.reviewId)}>
                          Edit
                        </button>
                        <button onClick={() => deleteReview(review.reviewId)}>Delete</button>
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          {!isReviewing ? (
            <button onClick={() => setIsReviewing(true)}>Add a review</button>
          ) : (
            <div>
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