import React from "react";
import { Link } from "react-router-dom";

const ResultsList = ({ searchResults }) => {
  return (
    <div className="need">
      {searchResults.map((book) => (
        <div key={book.id} className="need">
          <Link to={`/details/${book.id}`}>
            <div>
              <h3>{book?.volumeInfo.title}</h3>
              {book?.volumeInfo.imageLinks ? (
                <img
                  src={book?.volumeInfo.imageLinks.smallThumbnail}
                  alt={book?.volumeInfo.title}
                />
              ) : (
                <div>No Image Available</div>
              )}
              <h3>Average Rating: {book?.volumeInfo.averageRating} </h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;