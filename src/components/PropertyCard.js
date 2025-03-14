import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: property.id,
    data: {
      type: 'property',
      property,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  const handleClick = (e) => {
    if (!isDragging) {
      navigate(`/property/${property.id}`);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className="property-card group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className="relative">
        <img
          src={property.mainImage}
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
          draggable={false}
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full 
            ${isFavorite ? 'bg-red-500' : 'bg-white'} 
            group-hover:opacity-100 transition-opacity duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'text-white' : 'text-red-500'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {property.title}
          </h3>
          <p className="text-lg font-bold text-blue-600">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{property.bedrooms} bed</span>
          <span>{property.type}</span>
          <span className="truncate">{property.postcode}</span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-700">
            <span className="truncate">{property.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

PropertyCard.displayName = 'PropertyCard';

export default PropertyCard;
