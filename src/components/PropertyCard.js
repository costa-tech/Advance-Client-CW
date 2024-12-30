import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core';
import { Heart } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const PropertyCard = memo(({ property, isFavorite, onToggleFavorite }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: property.id,
    data: property
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow relative group"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
        className={`absolute top-2 right-2 p-2 rounded-full z-10 ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
        } hover:scale-110 active:scale-95 transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      <Link to={`/property/${property.id}`} className="block">
        <div className="relative">
          <img
            src={property.mainImage}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{property.title}</h3>
          <p className="text-gray-600 mb-2 font-medium">{formatPrice(property.price)}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <span className="font-medium">{property.bedrooms}</span>
              <span className="ml-1">bed</span>
            </span>
            <span className="capitalize">{property.type}</span>
            <span>{property.postcode}</span>
          </div>
        </div>
      </Link>
    </div>
  );
});

PropertyCard.displayName = 'PropertyCard';

export default PropertyCard;
