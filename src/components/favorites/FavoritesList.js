import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableFavoriteItem from './DraggableFavoriteItem';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function FavoritesList({ favorites, setFavorites }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'favorites-droppable',
  });

  const isInFavoritesPage = window.location.pathname === '/favorites';

  return (
    <div
      ref={setNodeRef}
      className={`
        bg-white rounded-lg p-4
        ${!isInFavoritesPage ? 'shadow-md' : ''}
        ${isOver ? 'ring-2 ring-blue-400' : ''}
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Favorites</h2>
        {favorites.length > 0 && (
          <div className="text-sm text-gray-500">
            Drag items out to remove
          </div>
        )}
      </div>

      <SortableContext items={favorites.map(f => f.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Heart className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 mb-2">No favorites yet</p>
              {isInFavoritesPage ? (
                <Link to="/" className="text-sm text-blue-600 hover:text-blue-800">
                  Browse properties
                </Link>
              ) : (
                <p className="text-sm text-gray-400">
                  Drag properties here or click the heart icon
                </p>
              )}
            </div>
          ) : (
            favorites.map((property) => (
              <DraggableFavoriteItem
                key={property.id}
                property={property}
                onRemove={() => {
                  setFavorites(prev => prev.filter(f => f.id !== property.id));
                }}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}
