import React from 'react';
import { Link } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export default function DraggableFavoriteItem({
  property,
  onRemove,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: property.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(property.id);
  };

  return (
    <Link to={`/property/${property.id}`}>
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 group relative"
      >
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.preventDefault()}
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="relative w-20 h-20 flex-shrink-0">
            <img
              src={property.mainImage}
              alt={property.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{property.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{formatPrice(property.price)}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <span>{property.bedrooms} bed</span>
              <span>{property.type}</span>
              <span className="truncate">{property.postcode}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={`Remove ${property.title} from favorites`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </Link>
  );
}
