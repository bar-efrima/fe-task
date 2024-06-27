import React, { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetailsByURL } from '../services/pokemon.service';
import PokemonCard from './PokemonCard';

// The component to display the list of Pokemon cards
function PokemonList({ onSelectPokemon }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // get the list of Pokemons
      const pokemonList = await getPokemons();
      const detailedPokemonList = await Promise.all(
        pokemonList.map(async (pokemon) => {
          return await getPokemonDetailsByURL(pokemon.url);
        })
      );
      setPokemons(detailedPokemonList); // Set the list of Pokemons
    };

    fetchData();
  }, []);

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={onSelectPokemon} />
      ))}
    </div>
  );
}

export default PokemonList;
