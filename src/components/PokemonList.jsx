import React, { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetailsByURL } from '../services/pokemon.service';
import PokemonCard from './PokemonCard';

const LIMIT = 21; // Number of Pokémon per page

// Component to display a list of Pokémon with pagination
function PokemonList({ onSelectPokemon }) { 
  const [pokemons, setPokemons] = useState([]); // state to store the list of Pokémon
  const [offset, setOffset] = useState(0); // state to store pagination offset
  const [loading, setLoading] = useState(false); // state to store loading state

  // Function to fetch Pokémon data based on the current offset
  const fetchData = async (offset) => {
    setLoading(true);  // Set loading state to true while fetching data
    const pokemonList = await getPokemons(LIMIT, offset);
    // Fetch the list of Pokemon
    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        return await getPokemonDetailsByURL(pokemon.url);
      })
    );
    setPokemons(detailedPokemonList); 
    setLoading(false);
  };

 // useEffect to fetch data whenever the offset changes
  useEffect(() => {
    fetchData(offset);
  }, [offset]);

   // useEffect hook to fetch data whenever the offset changes
  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - LIMIT);
    }
  };

  // Function to handle the next page button click
  const handleNextPage = () => {
    setOffset(offset + LIMIT);
  };

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
        <div className="pokemon-list">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={onSelectPokemon} />
          ))}
        </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={offset === 0}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
      </>
      )}
    </div>
  );
}

export default PokemonList;
