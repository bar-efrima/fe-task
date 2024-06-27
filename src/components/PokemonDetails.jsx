import React, { useEffect, useState } from 'react';
import { getPokemonDetailsByURL, capitalizeFirstLetter} from '../services/pokemon.service';
import { addFavorite, isFavorite } from '../services/favorites.service';

function PokemonDetails({ pokemon, onBack }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isCaught, setIsCaught] = useState(false);
  const [catchAttempt, setCatchAttempt] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
      const pokemonData = await getPokemonDetailsByURL(url);
      setPokemonDetails(pokemonData);
      setIsCaught(isFavorite(pokemonData));
    };

    fetchData();
  }, [pokemon.id]);


  const tryToCatch = () => {
    setCatchAttempt(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // 50% chance of success
        resolve(success);
      }, 2000); // Wait 1 second before resolving
    });
  };

  // Function to handle the catch button click
  const handleCatch = async () => {
    const success = await tryToCatch();
    if (success) {
      await addFavorite(pokemonDetails);
      setIsCaught(true);
      alert(`${pokemonDetails.name} was caught!`);

    } else {
      alert(`${pokemonDetails.name} escaped. Try again!`);
    }
    setCatchAttempt(false);
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
        <button onClick={handleCatch} disabled={isCaught || catchAttempt}>
        {isCaught ? 'Caught' : catchAttempt ? 'Attempting...' : 'Catch'}
        </button>
    </div>
  );
}

export default PokemonDetails;
