import "./App.css";

import React, { useState, useEffect } from 'react';
import { getFavorites} from './services/favorites.service';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritesSideBar from './components/FavoritesSideBar';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    refreshFavorites();
  }, []);

  const handleSelectPokemon = (pokemon) => { // Function to handle the selection of a Pokemon
    setSelectedPokemon(pokemon);
  };

  const handleBackToList = () => {  // Function to handle the back button click
    setSelectedPokemon(null);
  };

  const refreshFavorites = async () => { // Function to refresh the list of favorite Pokemons from local storage
    const favoritePokemons = await getFavorites();
    setFavorites(favoritePokemons);
  };

  return (
    <div className="app">
       <FavoritesSideBar onSelectPokemon={handleSelectPokemon} favorites={favorites} />
      <div className="main-content">
        <h1>Pokedex with Health.io</h1>
        {selectedPokemon ? (
          <PokemonDetails pokemon={selectedPokemon} onBack={handleBackToList} refreshFavorites={refreshFavorites}/>
        ) : (
          <PokemonList onSelectPokemon={handleSelectPokemon} />
        )}
      </div>
    </div>
  );
}

export default App;
