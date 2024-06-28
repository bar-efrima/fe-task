import React, { useEffect, useState } from 'react';
import { getFavorites } from '../services/favorites.service';
import PokemonCard from './PokemonCard';

function FavoritesSideBar({ onSelectPokemon }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritePokemons = await getFavorites();
      setFavorites(favoritePokemons);
    };

    fetchFavorites();
  }, []);

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
