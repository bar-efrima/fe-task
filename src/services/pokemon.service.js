import axios from 'axios';

// Base URL for the Pokémon API
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemons(limit = 150) {
  // Fetch the list of pokemons from the API
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}`);
    // return the list of Pokémon
    return response.data.results;
}catch (error) {
  console.error('Error fetching Pokémon list:', error);
  // Return empty array if error
  return [];
}
}

export async function getPokemonDetailsByURL(url) {
  // Fetch the pokemon details from according to the url given in the list of pokemons
  // Transform the data to only include to include only the id, name, relevant sprites, types, weight, height, and abilities.
}
