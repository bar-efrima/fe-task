import React, { useEffect, useState } from 'react';
import { getPokemonDetailsByURL, capitalizeFirstLetter} from '../services/pokemon.service';
import { addFavorite, removeFavorite, isFavorite } from '../services/favorites.service';

function PokemonDetails({ pokemon, onBack , refreshFavorites}) {
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
        const success = Math.random() > 0.1; // 50% chance of success
        resolve(success);
      }, 2000); // Wait 1 second before resolving
    });
  };

  // Function to handle the catch button click
  const handleCatch = async () => {
    const success = await tryToCatch();
    if (success) {
      await addFavorite(pokemonDetails);
      refreshFavorites(); // Refresh the list of favorite Pokemons
      setIsCaught(true);
      alert(`${pokemonDetails.name} was caught!`);
      

    } else {
      alert(`${pokemonDetails.name} escaped. Try again!`);
    }
    setCatchAttempt(false);
  };

  const handleRelease = async () => {
    await removeFavorite(pokemonDetails);
    setIsCaught(false);
    alert(`${pokemonDetails.name} was released!`);
    refreshFavorites();
  };

  if (!pokemonDetails) return <div>Loading...</div>;

  return (
    <div className="pokemon-details">
      <button onClick={onBack}>Back to List</button>
      <h2>{capitalizeFirstLetter(pokemonDetails.name)}</h2>
      <img src={pokemonDetails.sprites.other.home.front_default} alt={pokemonDetails.name} />
      <p>Types: {pokemonDetails.types.map(type => capitalizeFirstLetter(type)).join(', ')}</p>
      {/* Weight is in hectogram by by default */}
      <p>Weight: {Math.round(pokemonDetails.weight*100)/1000 + "kg"}</p>  
      <p>Height: {pokemonDetails.height*10 + "cm"}</p>
      <p>Abilities: {pokemonDetails.abilities.map(ability => capitalizeFirstLetter(ability)).join(', ')}</p>
      {isCaught ? (
        <button onClick={handleRelease}>Release</button>
      ) : (
        <button onClick={handleCatch} disabled={catchAttempt}>
          {catchAttempt ? 'Attempting...' : 'Catch'}
        </button>
      )}
    </div>
  );
}

export default PokemonDetails;
