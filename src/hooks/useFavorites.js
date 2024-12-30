import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (property) => {
    if (!favorites.some(f => f.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const reorderFavorites = (newOrder) => {
    setFavorites(newOrder);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
    reorderFavorites,
  };
}
