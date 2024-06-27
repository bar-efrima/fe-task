import "./App.css";

import { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetailsByURL } from './services/pokemon.service';
import { getFavorites, addFavorite, isFavorite } from './services/favorites.service';

function App() {
  // tests 
  useEffect(() => {
    // Test getPokemons 
    const fetchPokemons = async () => {
      const pokemons = await getPokemons();
      console.log('Pokémon List:', pokemons);

      // Test getPokemonDetailsByURL
      if (pokemons.length > 0) {
        const Pokemon1URL = pokemons[0].url;
        const pokemonDetails = await getPokemonDetailsByURL(Pokemon1URL);
        console.log('First Pokémon Details:', pokemonDetails);

      await addFavorite(pokemonDetails);
      console.log('Added to Favorites:', pokemonDetails);

      const favorites = await getFavorites();
      console.log('Favorites List:', favorites);

      const isFav = isFavorite(pokemonDetails);
      console.log(`Is ${pokemonDetails.name} a favorite?`, isFav);
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
