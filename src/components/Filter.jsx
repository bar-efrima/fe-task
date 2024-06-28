import React, { useState, useEffect } from 'react';

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
  }, [nameFilter, typeFilter, onFilter]);

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search by name"
        value={nameFilter}
        onChange={handleNameChange}
      />
      <select value={typeFilter} onChange={handleTypeChange}>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
