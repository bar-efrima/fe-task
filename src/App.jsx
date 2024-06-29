import "./App.css";

import React, { useState, useEffect } from 'react';
import { getFavorites} from './services/favorites.service';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritesSideBar from './components/FavoritesSideBar';
import Header from './components/Header';
import Alert from './components/Alert'; 

// Main App component
function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State to store the currently selected Pokémon
  const [favorites, setFavorites] = useState([]); // State to store the list of favorite Pokémon
  const [alertMessage, setAlertMessage] = useState(''); // State to store the alert message

  // useEffect to refresh favorites when the component mounts
  useEffect(() => {
    refreshFavorites();
  }, []);

  // Function to handle the selection of a Pokemon
  const handleSelectPokemon = (pokemon) => { 
    setSelectedPokemon(pokemon);
  };

  // Function to handle the back button click
  const handleBackToList = () => {  
    setSelectedPokemon(null);
  };

// Function to refresh the list of favorite Pokemons from local storage
  const refreshFavorites = async () => { 
    const favoritePokemons = await getFavorites();
    setFavorites(favoritePokemons);
  };

  // Function to show an alert message
  const showAlert = (message) => {
    setAlertMessage(message);
  };
 // Function to close the alert message
  const closeAlert = () => {
    setAlertMessage('');
  };

  return (
    <div className="app">
       <Header favoriteCount={favorites.length} />
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
