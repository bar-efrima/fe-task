
export async function getFavorites() {
  return new Promise((resolve) => {
    const favorites = localStorage.getItem("favorites");
    setTimeout(() => {
      resolve(JSON.parse(favorites) || []);
    }, 500);
  });
}

export async function addFavorite(pokemon) {
  // Add the pokemon to the favorites list
  // Get the favorites list from local storage of the browser
  return new Promise((resolve) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || []; 
    favorites.push(pokemon);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setTimeout(() => {
      resolve(favorites);
    }, 500);
  });
}

export function isFavorite(pokemon) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some(fav => fav.id === pokemon.id);
}
