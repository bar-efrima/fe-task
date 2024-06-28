import React, { useEffect, useState } from 'react';
import { getPokemonDetailsByURL, capitalizeFirstLetter} from '../services/pokemon.service';
import { addFavorite, removeFavorite, isFavorite } from '../services/favorites.service';
import backArrow from '../assets/Back.svg';

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
  const formattedId = "#" + pokemonDetails.id.toString().padStart(3, '0');

  return (
    <div className="pokemon-details">
      <img
        src={backArrow}
        alt="Back"
        className="back-arrow"
        onClick={onBack}
      />
      <div className="details-header">
        <h2>{capitalizeFirstLetter(pokemonDetails.name)}</h2>
        <h5>{formattedId}</h5>
      </div>
      <div className="details-body">
        <img src={pokemonDetails.sprites.other.home.front_default} alt={pokemonDetails.name} className="pokemon-image" />
        <div className="details-info">
          <h3> Pokémon Info</h3>
          <p>Types: <strong>{pokemonDetails.types.map(type => capitalizeFirstLetter(type)).join(', ')}</strong></p>
          <p>Weight: <strong>{Math.round(pokemonDetails.weight * 100) / 1000} kg</strong></p>
          <p>Height: <strong>{pokemonDetails.height * 10} cm</strong></p>
          <p>Abilities: <strong>{pokemonDetails.abilities.map(ability => capitalizeFirstLetter(ability)).join(', ')}</strong></p>
        </div>
      </div>
      {isCaught ? (
        <button onClick={handleRelease} className="catch-button">Release</button>
      ) : (
        <button onClick={handleCatch} disabled={catchAttempt} className="catch-button">
          {catchAttempt ? 'Attempting...' : 'Catch'}
        </button>
      )}
    </div>
  );
}


export default PokemonDetails;
