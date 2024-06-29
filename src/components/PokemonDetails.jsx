import React, { useEffect, useState } from 'react';
import { getPokemonDetailsByURL, capitalizeFirstLetter } from '../services/pokemon.service';
import { addFavorite, removeFavorite, isFavorite } from '../services/favorites.service';
import backArrow from '../assets/Back.svg';
import ball from '../assets/Pokeball_Load.svg';

const MAX_ATTEMPTS = 10; // Maximum number of catch attempts per day

// Component to display detailed information about a selected Pokémon
function PokemonDetails({ pokemon, onBack, refreshFavorites, showAlert, favorites }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isCaught, setIsCaught] = useState(false);
  const [catchAttempt, setCatchAttempt] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Fetch Pokémon details when the component mounts or the Pokémon ID changes
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
      const pokemonData = await getPokemonDetailsByURL(url);
      setPokemonDetails(pokemonData);
      setIsCaught(isFavorite(pokemonData));
    };
    fetchData();
  }, [pokemon.id]);

  // Update the caught state when the Pokémon details or favorites change
  useEffect(() => {
    if (pokemonDetails) {
      setIsCaught(isFavorite(pokemonDetails));
    }
  }, [pokemonDetails, favorites]);

  // Initialize or update the daily attempts from local storage
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storedData = JSON.parse(localStorage.getItem('dailyAttempts')) || {};
    if (storedData.date !== today) {
      localStorage.setItem('dailyAttempts', JSON.stringify({ date: today, attempts: 0 }));
      setAttempts(0);
    } else {
      setAttempts(storedData.attempts);
    }
  }, []);

  // Update the daily attempts count in local storage
  const updateAttempts = () => {
    const today = new Date().toISOString().split('T')[0];
    const storedData = JSON.parse(localStorage.getItem('dailyAttempts')) || { date: today, attempts: 0 };
    storedData.attempts += 1;
    localStorage.setItem('dailyAttempts', JSON.stringify(storedData));
    setAttempts(storedData.attempts);
  };

  // Simulate a catch attempt with a random success chance
  const tryToCatch = () => {
    setCatchAttempt(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% chance of success
        resolve(success);
      }, 3000); // Wait 3 seconds before resolving
    });
  };

  // Function to handle the catch button click
  const handleCatch = async () => {
    if (attempts >= MAX_ATTEMPTS) {
      showAlert('You reached your daily catch limit. Try again tomorrow.');
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 0.5 seconds before trying to catch
    const success = await tryToCatch();
    updateAttempts();
    if (success) {
      await addFavorite(pokemonDetails);
      refreshFavorites(); 
      setIsCaught(true);
      showAlert(`${capitalizeFirstLetter(pokemonDetails.name)} was caught!`);
    } else {
      showAlert(`${capitalizeFirstLetter(pokemonDetails.name)} escaped. Try again!`);
    }
    setCatchAttempt(false);
  };

    // Handle the release button click
  const handleRelease = async () => {
    await removeFavorite(pokemonDetails);
    setIsCaught(false);
    showAlert(`${capitalizeFirstLetter(pokemonDetails.name)} was released!`);
    refreshFavorites();
  };

  // Render loading state if Pokémon details are not yet available
  if (!pokemonDetails) return <div className='loading'>Loading...</div>;

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
