
import React from 'react'

const SearchUser = ({ search, setSearch, onSearch, onCancel }: any) => {
  return (
    <div>      
        <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "400px", marginRight: '20px', marginBottom: '20px', height: "20px"}}
        placeholder="Search user"
      />
      <button onClick={onSearch} style={{ width: "100px", marginRight: '20px', height: "30px" }}>Search</button>
    </div>
  )
}

export default SearchUser