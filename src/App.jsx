import "./App.css";

import React, { useState, useEffect } from 'react';
import { getFavorites} from './services/favorites.service';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritesSideBar from './components/FavoritesSideBar';
import Header from './components/Header';
import logo from './assets/react.svg'; // Import your logo image
import Alert from './components/Alert'; // Import the Alert component


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

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

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const closeAlert = () => {
    setAlertMessage('');
  };

  return (
    <div className="app">
       <Header logo={logo} favoriteCount={favorites.length} />
       <FavoritesSideBar onSelectPokemon={handleSelectPokemon} favorites={favorites} refreshFavorites={refreshFavorites} showAlert={showAlert} />
      <div className="main-content">

        {selectedPokemon ? (
          <PokemonDetails pokemon={selectedPokemon} onBack={handleBackToList} refreshFavorites={refreshFavorites} favorites={favorites} showAlert={showAlert} />
        ) : (
          <PokemonList onSelectPokemon={handleSelectPokemon} />
        )}
      </div>
      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
}

export default App;
