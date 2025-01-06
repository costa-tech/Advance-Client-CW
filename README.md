# Real Estate Property Search Application

A modern real estate property search application built with React, featuring an interactive map interface and advanced search capabilities.

## Features

- **Property Listings**: Browse through available properties with detailed information
- **Interactive Maps**: View property locations using Google Maps integration
- **Advanced Search**: Filter properties by:
  - Price range
  - Number of bedrooms
  - Property type
  - Date added
- **Property Details**: View comprehensive property information including:
  - High-quality images with gallery view
  - Detailed descriptions
  - Location on map
  - Property specifications
- **Favorites System**: Save and manage favorite properties
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- React 18
- Tailwind CSS for styling
- Google Maps API for location services
- React Router for navigation
- Vite for build tooling

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Google Maps API key

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Key Components

- `PropertyDetails`: Displays detailed information about a property
- `SearchForm`: Handles property search and filtering
- `Map`: Integrates Google Maps for property location display
- `ImageGallery`: Manages property image displays
- `FavoriteButton`: Handles favorite property functionality

## Configuration

The application requires the following configuration:

1. Google Maps API key in the Map component
2. Content Security Policy in index.html for external resources
3. Environment variables for API endpoints (if applicable)


