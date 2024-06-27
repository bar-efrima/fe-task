import "./App.css";

import React, { useState } from 'react';
import { getPokemons, getPokemonDetailsByURL } from './services/pokemon.service';
import { getFavorites, addFavorite, isFavorite } from './services/favorites.service';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSelectPokemon = (pokemon) => { // Function to handle the selection of a Pokemon
    setSelectedPokemon(pokemon);
  };

  const handleBackToList = () => {  // Function to handle the back button click
    setSelectedPokemon(null);
  };


  return (
    <>
    <h1>Pokedex with Health.io</h1>
    {selectedPokemon ? ( 
      <PokemonDetails pokemon={selectedPokemon} onBack={handleBackToList} /> // Show the Pokemon details if a Pokemon is selected
    ) : (
      <PokemonList onSelectPokemon={handleSelectPokemon} /> // Show the list of Pokemons if no Pokemon is selected
    )}
    </>
  );
}

export default App;
