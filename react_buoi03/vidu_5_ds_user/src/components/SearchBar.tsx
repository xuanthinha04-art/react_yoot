import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({ search, setSearch, onSearch }: any) => {
  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "200px", marginRight: '20px', marginBottom: '20px'}}
        placeholder="Search user"
      />
      <button onClick={onSearch}><Search/></button>
    </div>
  );
};

export default SearchBar;