

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
}


export function isFavorite(pokemon) {
  // Check if the pokemon is in the favorites list
}
