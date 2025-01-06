import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Heart, MapPin, Bed, Bath, Home } from 'lucide-react';
import Map from '../ui/Map';
import ImageGallery from '../ui/ImageGallery';
import { formatPrice, formatDate } from '../../utils/formatters';

export default function PropertyDetails({ property, isFavorite, onToggleFavorite }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Property Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              <div className="mt-1 flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.postcode}</span>
              </div>
            </div>
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full ${
                isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <Heart className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="p-6">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <img
              src={property.images[selectedImageIndex]}
              alt={`Property view ${selectedImageIndex + 1}`}
              className="object-cover rounded-lg w-full h-[400px] cursor-pointer"
              onClick={() => setShowGallery(true)}
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`h-20 w-full object-cover rounded cursor-pointer ${
                  selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Bed className="h-5 w-5 mr-2" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Home className="h-5 w-5 mr-2" />
              <span>{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-semibold">£{formatPrice(property.price)}</span>
            </div>
          </div>

          <Tabs>
            <TabList className="flex border-b border-gray-200 mb-4">
              <Tab className="px-6 py-2 text-gray-600 hover:text-gray-800 cursor-pointer border-b-2 border-transparent focus:outline-none">
                Description
              </Tab>
              <Tab className="px-6 py-2 text-gray-600 hover:text-gray-800 cursor-pointer border-b-2 border-transparent focus:outline-none">
                Location
              </Tab>
              <Tab className="px-6 py-2 text-gray-600 hover:text-gray-800 cursor-pointer border-b-2 border-transparent focus:outline-none">
                Floor Plan
              </Tab>
            </TabList>

            <TabPanel>
              <p className="text-gray-600 leading-relaxed">{property.longDescription}</p>
            </TabPanel>

            <TabPanel>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Located in {property.postcode}, this property offers excellent access to local amenities.
                </p>
                <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
                  <Map location={property.location} />
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={property.floorPlan}
                  alt="Floor Plan"
                  className="object-contain rounded-lg"
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      {showGallery && (
        <ImageGallery
          images={property.images}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}
