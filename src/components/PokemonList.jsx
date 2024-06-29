import React, { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetailsByURL } from '../services/pokemon.service';
import PokemonCard from './PokemonCard';

const LIMIT = 21; // Number of Pokémon per page

function PokemonList({ onSelectPokemon }) {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0); // Pagination offset
  const [loading, setLoading] = useState(false); // Loading state

  const fetchData = async (offset) => {
    setLoading(true);
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

  useEffect(() => {
    fetchData(offset);
  }, [offset]);

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - LIMIT);
    }
  };

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
