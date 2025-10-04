import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="flex">
      <input
        className="search"
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
    </section>
  );
};

export default Search;
