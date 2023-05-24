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
      <div>
        <button type="submit">Search</button>
        <br/>
      </div>
    </form>
  );
};

export default SearchBar;
