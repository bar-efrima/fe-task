import React, { useState, useEffect } from 'react';
import searchIcon from '../assets/Search.svg';

function Filter({ onFilter }) {
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const types = [
    'All', 'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting',
    'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon',
    'Dark', 'Steel', 'Fairy'
  ];

  useEffect(() => {
    onFilter(nameFilter, typeFilter);
  }, [nameFilter, typeFilter]);

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  return (
    <div className="filter-container">
      <div className="search-bar">
        <img src={searchIcon} alt="Search" className="search-icon" />
        <input
          type="text"
          placeholder=""
          value={nameFilter}
          onChange={handleNameChange}
        />
      </div>
      <select value={typeFilter} onChange={handleTypeChange}>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
