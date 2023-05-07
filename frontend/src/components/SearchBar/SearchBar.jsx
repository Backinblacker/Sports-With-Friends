import React, { useState } from 'react';

const SearchBar = ({ searchTerm = '', setSearchTerm, handleSubmit }) => {
  const [searchType, setSearchType] = useState('establishment_name');

  const handleRadioChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="establishment_name"
            checked={searchType === "establishment_name"}
            onChange={handleRadioChange}
          />
          Establishment Name
        </label>
        <label>
          <input
            type="radio"
            value="zip_code"
            checked={searchType === "zip_code"}
            onChange={handleRadioChange}
          />
          Zip Code
        </label>
        <label>
          <input
            type="radio"
            value="teams"
            checked={searchType === "teams"}
            onChange={handleRadioChange}
          />
          Teams
        </label>
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
