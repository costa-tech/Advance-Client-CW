import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { theme } from './styles/theme';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/property/PropertyDetails';
import SearchForm from './components/SearchForm';
import FavoritesList from './components/favorites/FavoritesList';
import { getFavorites, saveFavorites } from './utils/favorites';
import { sanitizeInput } from './utils/security';
import { properties } from './data/properties';

// Wrapper component for PropertyDetails to handle route params
const PropertyDetailsWrapper = ({ favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  
  if (!property) {
    return <div>Property not found</div>;
  }
  
  return (
    <PropertyDetails 
      property={property} 
      isFavorite={favorites.has(property.id)}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

export default function App() {
  const [searchResults, setSearchResults] = useState(properties);
  const [favorites, setFavorites] = useState(() => getFavorites());
  const favoritesSet = new Set(favorites.map(f => f.id));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleSearch = useCallback((criteria) => {
    let filtered = properties;

    if (criteria.type) {
      filtered = filtered.filter(p => p.type === criteria.type);
    }
    if (criteria.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(criteria.minPrice));
    }
    if (criteria.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(criteria.maxPrice));
    }
    if (criteria.minBedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(criteria.minBedrooms));
    }
    if (criteria.maxBedrooms) {
      filtered = filtered.filter(p => p.bedrooms <= parseInt(criteria.maxBedrooms));
    }
    if (criteria.postcode) {
      filtered = filtered.filter(p => p.postcode.toLowerCase().includes(criteria.postcode.toLowerCase()));
    }

    setSearchResults(filtered);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    
    if (over && over.id === 'favorites-droppable') {
      const draggedProperty = properties.find(p => p.id === active.id);
      if (draggedProperty && !favoritesSet.has(draggedProperty.id)) {
        const sanitizedProperty = {
          ...draggedProperty,
          title: sanitizeInput(draggedProperty.title),
          description: sanitizeInput(draggedProperty.description),
        };
        const newFavorites = [...favorites, sanitizedProperty];
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
      }
    }
  }, [favorites, favoritesSet]);

  const handleToggleFavorite = useCallback((id) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      let newFavorites;
      if (favoritesSet.has(id)) {
        newFavorites = favorites.filter(f => f.id !== id);
      } else {
        newFavorites = [...favorites, property];
      }
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    }
  }, [favorites, favoritesSet]);

  return (
    <Router>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="min-h-screen" style={{ backgroundColor: '#9a4896' }}>
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Property Search
                </Link>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                  <Link to="/favorites" className="text-gray-600 hover:text-gray-900">Favorites</Link>
                </div>
              </div>
            </nav>
          </header>

          {/* Hero Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Dream Home Today
              </h1>
              <p className="text-xl text-blue-100">
                Discover the perfect property that matches your lifestyle
              </p>
            </div>
          </div>

          <Routes>
            <Route 
              path="/favorites" 
              element={
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
                      <FavoritesList favorites={favorites} setFavorites={setFavorites} />
                    </div>
                  </div>
                </main>
              }
            />
            <Route 
              path="/" 
              element={
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <SearchForm onSearch={handleSearch} />
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <PropertyList
                          properties={searchResults}
                          favorites={favoritesSet}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="sticky top-24">
                        <FavoritesList favorites={favorites} setFavorites={setFavorites} />
                      </div>
                    </div>
                  </div>
                </main>
              } 
            />
            <Route 
              path="/property/:id" 
              element={<PropertyDetailsWrapper favorites={favoritesSet} onToggleFavorite={handleToggleFavorite} />} 
            />
          </Routes>

          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Property Search. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </DndContext>
    </Router>
  );
}
