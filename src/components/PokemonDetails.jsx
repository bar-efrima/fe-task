import React, { useEffect, useState } from 'react';
import { getPokemonDetailsByURL, capitalizeFirstLetter} from '../services/pokemon.service';
import { addFavorite, removeFavorite, isFavorite } from '../services/favorites.service';
import backArrow from '../assets/Back.svg';
import ball from '../assets/Pokeball_Load.svg';


function PokemonDetails({ pokemon, onBack , refreshFavorites, showAlert}) {
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
        const success = Math.random() > 0.7; // 70% chance of success
        resolve(success);
      }, 3000); // Wait 3 seconds before resolving
    });
  };

  // Function to handle the catch button click
  const handleCatch = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 0.5 seconds before trying to catch
    const success = await tryToCatch();
    if (success) {
      await addFavorite(pokemonDetails);
      refreshFavorites(); // Refresh the list of favorite Pokemons
      setIsCaught(true);
      showAlert(`${capitalizeFirstLetter(pokemonDetails.name)} was caught!`);
    } else {
      showAlert(`${capitalizeFirstLetter(pokemonDetails.name)} escaped. Try again!`);
    }
    setCatchAttempt(false);
  };

  const handleRelease = async () => {
    await removeFavorite(pokemonDetails);
    setIsCaught(false);
    showAlert(`${capitalizeFirstLetter(pokemonDetails.name)} was released!`);
    refreshFavorites();
  };

  if (!pokemonDetails) return <div>Loading...</div>;
  const formattedId = "#" + pokemonDetails.id.toString().padStart(3, '0');

  return (
    <div className="pokemon-details-card">
    <div className="pokemon-details">
      <img
        src={backArrow}
        alt="Back"
        className="back-arrow"
        onClick={onBack}
      />
      <div className="details-header">
        <h1>{capitalizeFirstLetter(pokemonDetails.name)}</h1>
        <h3>{formattedId}</h3>
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
      <button onClick={handleCatch} disabled={catchAttempt} className={`catch-button `}>
        <div className="pokeball-container">
          {catchAttempt ? <img src={ball} alt="Catching" className="pokeball" /> : 'Catch'}
        </div>
      </button>
      )}
    </div>
    </div>
  );
}


export default PokemonDetails;
