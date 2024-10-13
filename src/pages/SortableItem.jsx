import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, vehicle, status }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: { status }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="kanban-card">
      <p><strong>{vehicle.brand} {vehicle.model}</strong></p>
      <p>Plate: {vehicle.plate}</p>
    </div>
  );
};

export default SortableItem;
