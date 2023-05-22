import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import ResultsList from "../../components/ResultsList/ResultsList";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOption, setSearchOption] = useState("establishment");

  const fetchEstablishments = async () => {
    try {
      let lowerCaseSearchTerm = searchTerm.toLowerCase();
      let response = await axios.get(`http://127.0.0.1:5000/api/userinfo?q=${lowerCaseSearchTerm}`);
      setSearchResults([response.data]);
    } catch (error) {
      console.log("Error in fetchEstablishments request", error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEstablishments();
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className="container search">
      <h1>What Team Are You Trying to Watch?</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
        handleSearchOptionChange={handleSearchOptionChange}
        searchOption={searchOption}
      />
      <ResultsList searchResults={searchResults} />
    </div>
  );
};

export default SearchPage;
