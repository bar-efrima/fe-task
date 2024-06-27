import React, { useEffect, useState } from 'react';
import { getPokemonDetailsByURL } from '../services/pokemon.service';

function PokemonDetails({ pokemon, onBack }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
      const pokemonData = await getPokemonDetailsByURL(url);
      setPokemonDetails(pokemonData);
    };

    fetchData();
  }, [pokemon.id]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!pokemonDetails) return <div>Loading...</div>;

  return (
    <div className="pokemon-details">
      <button onClick={onBack}>Back to List</button>
      <h2>{capitalizeFirstLetter(pokemonDetails.name)}</h2>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <p>Types: {pokemonDetails.types.map(type => capitalizeFirstLetter(type)).join(', ')}</p>
      <p>Weight: {pokemonDetails.weight}</p>
      <p>Height: {pokemonDetails.height}</p>
      <p>Abilities: {pokemonDetails.abilities.map(ability => capitalizeFirstLetter(ability)).join(', ')}</p>
    </div>
  );
}

export default PokemonDetails;
