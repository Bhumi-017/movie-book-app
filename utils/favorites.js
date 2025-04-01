const FAVORITES_KEY = "favorites";

// Get favorites from localStorage
export function getFavorites() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  }
  return [];
}

// Save favorites to localStorage
export function saveFavorites(favorites) {
  if (typeof window !== "undefined") {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

// Add item to favorites
export function addToFavorites(item) {
  const favorites = getFavorites();
  if (!favorites.some((fav) => fav.id === item.id)) {
    favorites.push(item);
    saveFavorites(favorites);
  }
}

// Remove item from favorites
export function removeFromFavorites(itemId) {
  const favorites = getFavorites().filter((fav) => fav.id !== itemId);
  saveFavorites(favorites);
}
