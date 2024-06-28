import React from 'react';
import { capitalizeFirstLetter } from '../services/pokemon.service';
function PokemonCard({ pokemon, onClick}) {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      
      {/* <img src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} /> */}
      <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
      <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
      <h3>{"#"+pokemon.id}</h3>
    </div>
  );
}


export default PokemonCard;