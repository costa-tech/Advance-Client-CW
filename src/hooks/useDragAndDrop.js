import { useState } from 'react';

export function useDragAndDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedProperty, setDraggedProperty] = useState(null);

  const handleDragStart = (property) => {
    setIsDragging(true);
    setDraggedProperty(property);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedProperty(null);
  };

  return {
    isDragging,
    draggedProperty,
    handleDragStart,
    handleDragEnd,
  };
}
