import "./App.css";

import { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetailsByURL } from './services/pokemon.service';

function App() {
  // tests 
  useEffect(() => {
    // Test getPokemons function
    const fetchPokemons = async () => {
      const pokemons = await getPokemons();
      console.log('Pokémon List:', pokemons);

      // Test getPokemonDetailsByURL
      if (pokemons.length > 0) {
        const Pokemon1URL = pokemons[0].url;
        const pokemonDetails = await getPokemonDetailsByURL(Pokemon1URL);
        console.log('First Pokémon Details:', pokemonDetails);
      }
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
