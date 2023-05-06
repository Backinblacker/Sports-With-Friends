import React from "react";
import { Link } from "react-router-dom";
import taps from '../../assets/beer_taps.jpg'

const ResultsList = ({ searchResults }) => {
  return (
    <div className="need">
      {searchResults.map((user) => (
        <div key={user.id} className="need">
          <Link to={`/details/${user.id}`}>
            <div>
              <img className="need" src={taps} alt='beertaps'/>
              <h3>{user.establishment_name}</h3>
              <h3>Teams: {user.teams} </h3>
              <h3>Opens: {user.opening_time}</h3>
              <h3>Closes: {user.closing_time}</h3>
              <h3>Menu: {user.menu_url}</h3>
              <h3>Socials: {user.social_media}</h3>
              <h3>Other Entertainment: {user.entertainment}</h3>
              <h3>Reviews: {user.reviews}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;