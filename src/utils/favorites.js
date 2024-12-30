const FAVORITES_KEY = 'propertyFavorites';

export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavorite = (property) => {
  const favorites = getFavorites();
  if (!favorites.find(fav => fav.id === property.id)) {
    favorites.push(property);
    saveFavorites(favorites);
  }
};

export const removeFavorite = (propertyId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(fav => fav.id !== propertyId);
  saveFavorites(updatedFavorites);
};

export const clearFavorites = () => {
  localStorage.removeItem(FAVORITES_KEY);
};
