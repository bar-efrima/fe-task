import React, { useState, useEffect } from 'react';
import searchIcon from '../assets/Search.svg';

// Filter component to filter Pokémon by name and type
function Filter({ onFilter }) {
  const [nameFilter, setNameFilter] = useState(''); // State to store the name filter
  const [typeFilter, setTypeFilter] = useState('All'); // State to store the type filter

   // List of Pokémon types for the dropdown
  const types = [
    'All', 'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting',
    'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon',
    'Dark', 'Steel', 'Fairy'
  ];

  useEffect(() => {
    onFilter(nameFilter, typeFilter);
  }, [nameFilter, typeFilter]);

  // Handle changes to the name input field
  const handleNameChange = (e) => { 
    setNameFilter(e.target.value); 
  };

  // Handle changes to the type dropdown
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
