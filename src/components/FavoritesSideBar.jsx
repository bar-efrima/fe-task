import React from 'react';
import PokemonCard from './PokemonCard';

function FavoritesSideBar({ onSelectPokemon, favorites }) {
  return (
    <aside className="favorites-sidebar">
      <h2>Caught List</h2>
      <div className="favorites-list">
        {favorites.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={onSelectPokemon} />
        ))}
      </div>
    </aside>
  );
}

export default FavoritesSideBar;
