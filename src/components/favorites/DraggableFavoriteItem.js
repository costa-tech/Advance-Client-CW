import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export default function DraggableFavoriteItem({
  property,
  onRemove,
}) {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: property.id,
    data: {
      type: 'favorite',
      property,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const handleClick = (e) => {
    // Only navigate if we're not dragging
    if (!isDragging) {
      e.preventDefault();
      navigate(`/property/${property.id}`);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="favorite-item bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
      onClick={handleClick}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={property.mainImage}
            alt={property.title}
            className="w-20 h-20 object-cover rounded"
          />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {property.title}
            </h3>
            <button
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove from favorites"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm font-semibold text-blue-600">
            {formatPrice(property.price)}
          </p>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
            <span>{property.bedrooms} bed</span>
            <span>•</span>
            <span>{property.type}</span>
            <span>•</span>
            <span className="truncate">{property.postcode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
