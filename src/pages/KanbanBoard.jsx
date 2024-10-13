import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import '../styles/KanbanBoard.css';

const initialVehicles = {
  available: [
    { id: '1', brand: 'Toyota', model: 'Corolla', plate: '123-ABC' },
    { id: '2', brand: 'BMW', model: 'X5', plate: '456-DEF' },
  ],
  maintenance: [
    { id: '3', brand: 'Audi', model: 'A6', plate: '789-GHI' },
  ],
  repair: [],
};

const KanbanBoard = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [newVehicle, setNewVehicle] = useState({
    brand: '',
    model: '',
    plate: '',
    status: 'available',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const newId = Date.now().toString();
    const addedVehicle = { ...newVehicle, id: newId };

    setVehicles((prev) => ({
      ...prev,
      [newVehicle.status]: [...prev[newVehicle.status], addedVehicle],
    }));

    setNewVehicle({ brand: '', model: '', plate: '', status: 'available' });
  };

  const onDragEnd = ({ active, over }) => {
    if (!over) return; 

    const fromStatus = active.data.current.status;
    const toStatus = over.id;

    if (!vehicles[fromStatus] || !vehicles[toStatus]) return;

    
    if (fromStatus !== toStatus) {
      const fromList = [...vehicles[fromStatus]];
      const toList = [...vehicles[toStatus]];

      const movedItemIndex = fromList.findIndex(v => v.id === active.id);
      if (movedItemIndex === -1) return;

      const movedItem = fromList[movedItemIndex];

      
      fromList.splice(movedItemIndex, 1);
     
      toList.splice(over.index, 0, movedItem);

      setVehicles({
        ...vehicles,
        [fromStatus]: fromList,
        [toStatus]: toList,
      });
    } else {
      const newList = arrayMove(vehicles[fromStatus], active.index, over.index);
      setVehicles({ ...vehicles, [fromStatus]: newList });
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        <form className="add-vehicle-form" onSubmit={handleAddVehicle}>
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newVehicle.brand}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={newVehicle.model}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="plate"
            placeholder="Plate"
            value={newVehicle.plate}
            onChange={handleInputChange}
            required
          />
          <select name="status" value={newVehicle.status} onChange={handleInputChange}>
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
          </select>
          <button type="submit">Add Vehicle</button>
        </form>

        <div className="kanban-columns">
          {['available', 'maintenance', 'repair'].map((status) => (
            <KanbanColumn key={status} status={status} vehicles={vehicles[status]} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

const KanbanColumn = ({ status, vehicles }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="kanban-column" ref={setNodeRef}>
      <h2 className="kanban-title">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
      {vehicles.map((vehicle, index) => (
        <KanbanCard key={vehicle.id} vehicle={vehicle} status={status} index={index} />
      ))}
    </div>
  );
};

const KanbanCard = ({ vehicle, status, index }) => {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: vehicle.id,
    data: { status },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="kanban-card"
    >
      <p className="vehicle-info"><strong>{vehicle.brand} {vehicle.model}</strong></p>
      <p className="vehicle-plate">Plate: {vehicle.plate}</p>
    </div>
  );
};

export default KanbanBoard;
