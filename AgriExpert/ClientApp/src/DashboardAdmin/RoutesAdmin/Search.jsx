import React, { useState, useEffect, useRef } from "react";
import "../ComponentsAdmin/SearchStyles.css";

const SearchBox = ({ suggestions = [], onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setErrorMessage("");
  };

  const handleClick = (suggestion) => {
    setSearchTerm(suggestion);
    setActiveSuggestion(0);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (filteredSuggestions.length === 0) {
        setErrorMessage("No results found.");
      } else {
        setSearchTerm(filteredSuggestions[activeSuggestion]);
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setSearchHistory([
          ...searchHistory,
          filteredSuggestions[activeSuggestion]
        ]);
        onSearch(filteredSuggestions[activeSuggestion]);
        inputRef.current.blur();
      }
    } else if (event.key === "ArrowDown") {
      if (activeSuggestion === filteredSuggestions.length - 1) {
        setActiveSuggestion(0);
      } else {
        setActiveSuggestion(activeSuggestion + 1);
      }
    } else if (event.key === "ArrowUp") {
      if (activeSuggestion === 0) {
        setActiveSuggestion(filteredSuggestions.length - 1);
      } else {
        setActiveSuggestion(activeSuggestion - 1);
      }
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        ref={inputRef}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {showSuggestions && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={index === activeSuggestion ? "active" : ""}
              onClick={() => handleClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {searchHistory.length > 0 && (
        <div className="search-history">
          <h3>Search History:</h3>
          <ul>
            {searchHistory.map((history, index) => (
              <li key={history + index}>{history}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
