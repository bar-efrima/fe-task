import React from 'react';
import { capitalizeFirstLetter } from '../services/pokemon.service';
function PokemonCard({ pokemon, onClick}) {
  const formattedId = "#" + pokemon.id.toString().padStart(3, '0');
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      
      {/* <img src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} /> */}
      <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
      <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
      <h5> {formattedId}</h5>
    </div>
  );
}


export default PokemonCard;