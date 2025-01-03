import React from 'react';
import { getFavorites, saveFavorites } from '../utils/favorites';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import DraggableFavoriteItem from '../components/favorites/DraggableFavoriteItem';

export default function FavoritesPage() {
  const [favorites, setFavorites] = React.useState(() => getFavorites());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setFavorites((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newFavorites = arrayMove(items, oldIndex, newIndex);
        saveFavorites(newFavorites);
        return newFavorites;
      });
    }
  };

  const handleRemove = (propertyId) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(fav => fav.id !== propertyId);
      saveFavorites(newFavorites);
      return newFavorites;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={favorites.map(f => f.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {favorites.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No favorites yet. Add some properties to your favorites!
                    </p>
                  ) : (
                    favorites.map((property) => (
                      <DraggableFavoriteItem
                        key={property.id}
                        property={property}
                        onRemove={() => handleRemove(property.id)}
                      />
                    ))
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </main>
    </div>
  );
}
