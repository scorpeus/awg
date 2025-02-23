import React, { useState } from "react";
import "../styles/searchbar.css";
import searchIcon from "../assets/search.svg";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <img src={searchIcon} alt="Search" className="search-icon" />{" "}
      {/* Иконка */}
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
