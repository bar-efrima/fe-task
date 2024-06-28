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
      <div className="types-container">
        <p>Types:</p>
        {pokemonDetails.types.map(type => (
          <span key={type.type.name} className={`type-square ${type.type.name}`}>
            {capitalizeFirstLetter(type.type.name)}
          </span>
        ))}
      </div>
      <p>Weight: {Math.round(pokemonDetails.weight*100)/1000 + "kg"}</p>  
      <p>Height: {pokemonDetails.height*10 + "cm"}</p>
      <div className="abilities-container">
        <p>Abilities:</p>
        {pokemonDetails.abilities.map(ability => (
          <span key={ability.ability.name} className="ability-square">
            {capitalizeFirstLetter(ability.ability.name)}
          </span>
        ))}
      </div>
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
