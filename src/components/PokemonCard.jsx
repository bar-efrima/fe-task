import React from 'react';

function PokemonCard({ pokemon, onClick}) {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
    </div>
  );
}


export default PokemonCard;