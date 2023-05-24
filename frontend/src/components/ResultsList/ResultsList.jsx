import React from "react";
import { Link } from "react-router-dom";
import mug from '../../assets/beermug.jpg'

const ResultsList = ({ searchResults, searchTerm }) => {
  let results = searchResults.filter((establishment)=> {
    return (establishment.establishment_name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  })
  return (
    <div className="need">
      {results.map((user) => (
        <div key={user.id} className="need">
          <Link to={`/details/${user.id}`}>
            <div>
              <img className="bar-image" src={mug} alt='beer'/>
              <h3>{user.establishment_name}</h3>
              <h3>Zip Code: {user.zip_code}</h3>
              {/* <h3>Teams: {user.teams} </h3> */}
              {/* <h3>Opens: {user.opening_time}</h3>
              <h3>Closes: {user.closing_time}</h3>
              <h3>Menu: {user.menu_url}</h3> */}
              <h3>Socials: {user.social_media}</h3>
              {/* <h3>Other Entertainment: {user.entertainment}</h3> */}
              {/* <h3>Reviews: {user.reviews?.map((review)=>(
                <>
                <p>User: {review.username}</p>
                <p>Review: {review.text}</p></>
              ))}</h3> */}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;