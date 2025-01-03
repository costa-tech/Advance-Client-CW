import React from 'react';

export default function Map({ lat, lng }) {
  return (
    <iframe
      title="Property Location"
      width="100%"
      height="400"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
    />
  );
}
