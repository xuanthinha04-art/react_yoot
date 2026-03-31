import React from "react";

const SearchBar = ({ search, setSearch }: any) => {
  return (
    <input
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;