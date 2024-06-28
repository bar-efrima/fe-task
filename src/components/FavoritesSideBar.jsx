import React from 'react';
import PokemonCard from './PokemonCard';
import { removeFavorite } from '../services/favorites.service';

function FavoritesSideBar({ onSelectPokemon, favorites, refreshFavorites }) {
  const handleRemove = async (pokemon) => {
    await removeFavorite(pokemon);
    refreshFavorites();
  };
  return (
    <aside className="favorites-sidebar">
      <h2>Caught List</h2>
      <div className="favorites-list">
      {favorites.map((pokemon) => (
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
