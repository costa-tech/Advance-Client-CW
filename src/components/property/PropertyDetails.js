import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Heart, MapPin, Bed, Home, Calendar } from 'lucide-react';
import ImageGallery from '../ui/ImageGallery';
import Map from '../ui/Map';
import { formatPrice, formatDate } from '../../utils/formatters';
import { addFavorite, removeFavorite, getFavorites } from '../../utils/favorites';

export default function PropertyDetails({ property }) {
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === property.id);
  });

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={property.mainImage}
          alt={property.title}
          className="w-full h-96 object-cover cursor-pointer"
          onClick={() => setShowGallery(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-2xl mb-2">{formatPrice(property.price)}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.postcode}
                </span>
                <span className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  {property.bedrooms} bedrooms
                </span>
                <span className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  {property.type}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Added {formatDate(property.dateAdded)}
                </span>
              </div>
            </div>
            <button
              onClick={handleFavoriteClick}
              className={`p-3 rounded-full ${
                isFavorite ? 'bg-red-500' : 'bg-white'
              } transition-colors`}
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? 'text-white fill-current' : 'text-gray-600'
                }`}
              />
            </button>
          </div>
        </div>
        
        {/* Thumbnails */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {property.images.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md cursor-pointer border-2 border-white hover:opacity-90 transition-opacity"
              onClick={() => setShowGallery(true)}
            />
          ))}
          {property.images.length > 4 && (
            <div
              className="w-20 h-20 bg-black bg-opacity-50 rounded-md flex items-center justify-center cursor-pointer hover:bg-opacity-60 transition-colors"
              onClick={() => setShowGallery(true)}
            >
              <span className="text-white font-medium">+{property.images.length - 4}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="p-6">
        <Tabs>
          <TabList className="flex border-b mb-6">
            <Tab className="px-6 py-3 text-gray-600 hover:text-gray-900 cursor-pointer border-b-2 border-transparent focus:outline-none ui-selected:border-blue-500 ui-selected:text-blue-500 transition-colors">
              Description
            </Tab>
            <Tab className="px-6 py-3 text-gray-600 hover:text-gray-900 cursor-pointer border-b-2 border-transparent focus:outline-none ui-selected:border-blue-500 ui-selected:text-blue-500 transition-colors">
              Floor Plan
            </Tab>
            <Tab className="px-6 py-3 text-gray-600 hover:text-gray-900 cursor-pointer border-b-2 border-transparent focus:outline-none ui-selected:border-blue-500 ui-selected:text-blue-500 transition-colors">
              Location
            </Tab>
          </TabList>

          <TabPanel>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{property.longDescription}</p>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Property Type</p>
                  <p className="font-medium flex items-center">
                    <Home className="w-4 h-4 mr-2 text-gray-400" />
                    {property.type}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-medium flex items-center">
                    <Bed className="w-4 h-4 mr-2 text-gray-400" />
                    {property.bedrooms}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {property.postcode}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Added</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {formatDate(property.dateAdded)}
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={property.floorPlan}
                alt="Floor Plan"
                className="w-full h-full object-contain"
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <Map lat={property.location.lat} lng={property.location.lng} />
            </div>
          </TabPanel>
        </Tabs>
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
