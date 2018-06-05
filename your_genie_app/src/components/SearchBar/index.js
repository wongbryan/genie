import React from 'react';
import glass from '../../assets/images/search.png';

const SearchBar = () => (
  <div className="search-container">
    <div className="search">
      <img className="glass" alt="search" src={glass} />
      <input className="search-text" type="search" placeholder="Search..." />
      <div className="buffer" />
    </div>
  </div>
);

export default SearchBar;
