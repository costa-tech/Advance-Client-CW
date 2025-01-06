import React, { useState } from "react";
import { Search, Home, Calendar, PoundSterling } from "lucide-react";

// Validation functions
const validatePostcode = (postcode) => {
  if (!postcode) return true;
  const postcodeRegex = /^[A-Za-z]{1,2}[0-9][0-9A-Za-z]?$/;
  return postcodeRegex.test(postcode);
};

const validatePrice = (price) => {
  if (!price) return true;
  const numPrice = Number(price);
  return !isNaN(numPrice) && numPrice >= 0;
};

const validateBedrooms = (bedrooms) => {
  if (!bedrooms) return true;
  const numBedrooms = Number(bedrooms);
  return !isNaN(numBedrooms) && numBedrooms >= 0 && Number.isInteger(numBedrooms);
};

const validateDate = (date) => {
  if (!date) return true;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

export default function SearchForm({ onSearch }) {
  const [criteria, setCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate price range
    if (criteria.minPrice && criteria.maxPrice) {
      if (!validatePrice(criteria.minPrice)) newErrors.minPrice = 'Minimum price must be a non-negative number';
      if (!validatePrice(criteria.maxPrice)) newErrors.maxPrice = 'Maximum price must be a non-negative number';
      if (Number(criteria.minPrice) > Number(criteria.maxPrice)) newErrors.maxPrice = 'Minimum price cannot be greater than maximum price';
    }

    // Validate bedrooms range
    if (criteria.minBedrooms && criteria.maxBedrooms) {
      if (!validateBedrooms(criteria.minBedrooms)) newErrors.minBedrooms = 'Minimum bedrooms must be a non-negative integer';
      if (!validateBedrooms(criteria.maxBedrooms)) newErrors.maxBedrooms = 'Maximum bedrooms must be a non-negative integer';
      if (Number(criteria.minBedrooms) > Number(criteria.maxBedrooms)) newErrors.maxBedrooms = 'Minimum bedrooms cannot be greater than maximum bedrooms';
    }

    // Validate postcode
    if (criteria.postcode) {
      if (!validatePostcode(criteria.postcode)) newErrors.postcode = 'Invalid postcode';
    }

    // Validate date range
    if (criteria.dateFrom && criteria.dateTo) {
      if (!validateDate(criteria.dateFrom)) newErrors.dateFrom = 'Invalid date format';
      if (!validateDate(criteria.dateTo)) newErrors.dateTo = 'Invalid date format';
      if (new Date(criteria.dateFrom) > new Date(criteria.dateTo)) newErrors.dateTo = 'Start date cannot be after end date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSearch(criteria);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Home className="w-4 h-4 mr-2" />
            Property Type
          </label>
          <select
            name="type"
            value={criteria.type}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <PoundSterling className="w-4 h-4 mr-2" />
            Price Range
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={criteria.minPrice}
                onChange={handleChange}
                min="0"
                className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 pl-7 ${
                  errors.minPrice ? 'border-red-500' : ''
                }`}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">£</span>
            </div>
            <div className="relative flex-1">
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={criteria.maxPrice}
                onChange={handleChange}
                min="0"
                className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 pl-7 ${
                  errors.maxPrice ? 'border-red-500' : ''
                }`}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">£</span>
            </div>
          </div>
          {(errors.minPrice || errors.maxPrice) && (
            <p className="mt-1 text-sm text-red-600">
              {errors.minPrice || errors.maxPrice}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Bedrooms
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="minBedrooms"
              placeholder="Min"
              value={criteria.minBedrooms}
              onChange={handleChange}
              min="0"
              className={`w-1/2 p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors.minBedrooms ? 'border-red-500' : ''
              }`}
            />
            <input
              type="number"
              name="maxBedrooms"
              placeholder="Max"
              value={criteria.maxBedrooms}
              onChange={handleChange}
              min="0"
              className={`w-1/2 p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors.maxBedrooms ? 'border-red-500' : ''
              }`}
            />
          </div>
          {(errors.minBedrooms || errors.maxBedrooms) && (
            <p className="mt-1 text-sm text-red-600">
              {errors.minBedrooms || errors.maxBedrooms}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="date"
                name="dateFrom"
                value={criteria.dateFrom}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="From"
              />
              {errors.dateFrom && <p className="text-red-500 text-xs mt-1">{errors.dateFrom}</p>}
            </div>
            <div>
              <input
                type="date"
                name="dateTo"
                value={criteria.dateTo}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="To"
                min={criteria.dateFrom}
              />
              {errors.dateTo && <p className="text-red-500 text-xs mt-1">{errors.dateTo}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Postcode Area
          </label>
          <input
            type="text"
            name="postcode"
            placeholder="e.g. BR1, NW1"
            value={criteria.postcode}
            onChange={handleChange}
            pattern="^[A-Za-z]{1,2}[0-9][0-9A-Za-z]?$"
            className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 ${
              errors.postcode ? 'border-red-500' : ''
            }`}
          />
          {errors.postcode && (
            <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>
          )}
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2.5 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Properties</span>
          </button>
        </div>
      </div>
    </form>
  );
}
