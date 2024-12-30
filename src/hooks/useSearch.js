import { useState, useCallback } from 'react';
import { properties } from '../data/properties';

export function useSearch() {
  const [searchResults, setSearchResults] = useState(properties);

  const search = useCallback((criteria) => {
    let filtered = properties;

    if (criteria.type) {
      filtered = filtered.filter(p => p.type === criteria.type);
    }

    if (criteria.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(criteria.minPrice));
    }

    if (criteria.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(criteria.maxPrice));
    }

    if (criteria.minBedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(criteria.minBedrooms));
    }

    if (criteria.maxBedrooms) {
      filtered = filtered.filter(p => p.bedrooms <= parseInt(criteria.maxBedrooms));
    }

    if (criteria.dateFrom) {
      filtered = filtered.filter(p => p.dateAdded >= criteria.dateFrom);
    }

    if (criteria.dateTo) {
      filtered = filtered.filter(p => p.dateAdded <= criteria.dateTo);
    }

    if (criteria.postcode) {
      filtered = filtered.filter(p => 
        p.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())
      );
    }

    setSearchResults(filtered);
  }, []);

  return { searchResults, search };
}
