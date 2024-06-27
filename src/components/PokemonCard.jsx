import React from 'react';
import { capitalizeFirstLetter } from '../services/pokemon.service';
function PokemonCard({ pokemon, onClick}) {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
      <img src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
    </div>
  );
}


export default PokemonCard;