import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableFavoriteItem from './DraggableFavoriteItem';

export default function DraggableFavoritesList({
  favorites,
  onRemove,
  onClear,
  onReorder,
}) {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = favorites.findIndex((item) => item.id === active.id);
      const newIndex = favorites.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(favorites, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Favorites</h2>
        {favorites.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Drag properties here to add to favorites
        </p>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={favorites} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {favorites.map((property) => (
                <DraggableFavoriteItem
                  key={property.id}
                  property={property}
                  onRemove={() => onRemove(property.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
