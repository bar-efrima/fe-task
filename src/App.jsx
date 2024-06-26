import "./App.css";
import { getPokemons } from './services/pokemon.service';
import { useEffect, useState } from 'react';

function App() {
  // test
  useEffect(() => {
    // Test getPokemons function
    const fetchPokemons = async () => {
      const pokemons = await getPokemons();
      console.log('Pokémon List:', pokemons);
    };
    fetchPokemons();
  }, []);
  return (
    <>
    <h1>Pokedex with Health.io</h1>
      {/* Add the main app content here - side panel, main view (list vs details) and header */}
    </>
  );
}

export default App;
