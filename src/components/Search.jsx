import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
