import "./App.css";

import React, { useState } from 'react';
import { getPokemons, getPokemonDetailsByURL } from './services/pokemon.service';
import { getFavorites, addFavorite, isFavorite } from './services/favorites.service';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritesSideBar from './components/FavoritesSideBar';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSelectPokemon = (pokemon) => { // Function to handle the selection of a Pokemon
    setSelectedPokemon(pokemon);
  };

  const handleBackToList = () => {  // Function to handle the back button click
    setSelectedPokemon(null);
  };


  return (
    <div className="app">
      <FavoritesSideBar onSelectPokemon={handleSelectPokemon} />
      <div className="main-content">
        <h1>Pokedex with Health.io</h1>
        {selectedPokemon ? (
          <PokemonDetails pokemon={selectedPokemon} onBack={handleBackToList} />
        ) : (
          <PokemonList onSelectPokemon={handleSelectPokemon} />
        )}
      </div>
    </div>
  );
}

export default App;
