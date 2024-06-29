import React from 'react';
import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { removeFavorite } from '../services/favorites.service';
import {capitalizeFirstLetter} from '../services/pokemon.service';

import Filter from './Filter';

// Component to display the sidebar of favorite Pokémon
function FavoritesSideBar({ onSelectPokemon, favorites, refreshFavorites, showAlert }) {
  const [filteredFavorites, setFilteredFavorites] = useState(favorites); // State to store the filtered list of favorites

  // Update the filtered list when the favorites change
  useEffect(() => { 
    setFilteredFavorites(favorites); 
  }, [favorites]);

  // Initial filter setup to show all favorites
  useEffect(() => {
    handleFilter('', 'All');
  }, [favorites]);

  // Function to handle removing a Pokémon from favorites
  const handleRemove = async (pokemon) => {
    await removeFavorite(pokemon);
    refreshFavorites(); 
    showAlert(`${capitalizeFirstLetter(pokemon.name)} has been released!`);
    setIsCaught(false);
    
  };

  // Function to handle filtering of favorite Pokémon by name and type
  const handleFilter = (name, type) => {
    const filtered = favorites.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(name.toLowerCase());
      const matchesType = type === 'All' || pokemon.types.some(t => t.toLowerCase() === type.toLowerCase());
      return matchesName && matchesType;
    });
    setFilteredFavorites(filtered); // Update the filtered list
  };

  return (
    <aside className="favorites-sidebar">
      <Filter onFilter={handleFilter} />
      <div className="favorites-list">
      {filteredFavorites.map((pokemon) => (
          <div key={pokemon.id} className="favorite-item">
            <PokemonCard pokemon={pokemon} onClick={onSelectPokemon} />
            <button onClick={() => handleRemove(pokemon)} className="remove-button">Remove</button>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default FavoritesSideBar;
