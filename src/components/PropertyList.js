import React from 'react';
import PropertyCard from './PropertyCard';

export default function PropertyList({
  properties,
  favorites,
  onToggleFavorite
}) {
  return (
    <div className="results-section">
      <div className="results-container">
        <aside className="results-filters">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          {/* Filter controls will go here */}
        </aside>

        <main>
          <div className="results-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={() => onToggleFavorite(property.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
