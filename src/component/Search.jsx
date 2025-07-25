import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search icon" />
        <input
          type="text"
          placeholder="Search throughs 1000s of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>
    </div>
  )
}

export default Search