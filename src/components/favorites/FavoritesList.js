import React, { useCallback } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { saveFavorites, clearFavorites } from '../../utils/favorites';
import DraggableFavoriteItem from './DraggableFavoriteItem';
import { Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FavoritesList({ favorites, setFavorites }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: 'favorites-droppable'
  });

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      if (over?.id === 'favorites-droppable') {
        return;
      }
      setFavorites((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newFavorites = arrayMove(items, oldIndex, newIndex);
        saveFavorites(newFavorites);
        return newFavorites;
      });
    }
  }, [setFavorites]);

  const handleRemove = useCallback((propertyId) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(fav => fav.id !== propertyId);
      saveFavorites(newFavorites);
      return newFavorites;
    });
  }, [setFavorites]);

  const handleClearAll = useCallback(() => {
    clearFavorites();
    setFavorites([]);
  }, [setFavorites]);

  const isInFavoritesPage = window.location.pathname === '/favorites';

  return (
    <div className={`bg-white ${!isInFavoritesPage && 'p-4'} rounded-lg ${!isInFavoritesPage && 'shadow'}`}>
      {!isInFavoritesPage && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Favorites</h2>
          {favorites.length > 0 && (
            <Link to="/favorites" className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </Link>
          )}
        </div>
      )}
      
      <div
        ref={setDroppableRef}
        className={`min-h-[100px] rounded-lg transition-colors duration-200 ${favorites.length === 0 ? 'bg-gray-50' : ''}`}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={favorites.map(f => f.id)} strategy={verticalListSortingStrategy}>
            {favorites.length > 0 ? (
              <div className="space-y-2">
                {favorites.map((property) => (
                  <DraggableFavoriteItem
                    key={property.id}
                    property={property}
                    onRemove={() => handleRemove(property.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Heart className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500 mb-2">No favorites yet</p>
                {isInFavoritesPage ? (
                  <Link to="/" className="text-sm text-blue-600 hover:text-blue-800">
                    Browse properties to add some favorites
                  </Link>
                ) : (
                  <p className="text-sm text-gray-400">
                    Click the heart icon on properties to add them here
                  </p>
                )}
              </div>
            )}
          </SortableContext>
        </DndContext>

        {favorites.length > 0 && isInFavoritesPage && (
          <div className="mt-6 border-t pt-4">
            <button
              onClick={handleClearAll}
              className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors duration-150"
              aria-label="Clear all favorites"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
