/**
 * Utility functions for form validation
 */

export const validatePostcode = (postcode) => {
  const postcodeRegex = /^[A-Za-z]{1,2}[0-9][0-9A-Za-z]?$/;
  return postcodeRegex.test(postcode);
};

export const validatePrice = (price) => {
  const numPrice = Number(price);
  return !isNaN(numPrice) && numPrice >= 0;
};

export const validateBedrooms = (bedrooms) => {
  const numBedrooms = Number(bedrooms);
  return !isNaN(numBedrooms) && numBedrooms >= 0 && Number.isInteger(numBedrooms);
};
