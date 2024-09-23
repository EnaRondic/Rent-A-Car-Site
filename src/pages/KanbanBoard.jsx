import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../styles/KanbanBoard.css";

const initialVehicles = {
  available: [
    { id: '1', brand: 'Toyota', model: 'Corolla', plate: '123-ABC' },
    { id: '2', brand: 'BMW', model: 'X5', plate: '456-DEF' }
  ],
  maintenance: [
    { id: '3', brand: 'Audi', model: 'A6', plate: '789-GHI' }
  ],
  repair: []
};

const KanbanBoard = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [newVehicle, setNewVehicle] = useState({ brand: '', model: '', plate: '', status: 'available' });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = vehicles[source.droppableId];
    const destCol = vehicles[destination.droppableId];
    const [movedVehicle] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, movedVehicle);

    setVehicles({
      ...vehicles,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const newId = (Math.random() * 10000).toString(); // Generiši jedinstveni ID
    const addedVehicle = { ...newVehicle, id: newId };

    setVehicles((prev) => ({
      ...prev,
      [newVehicle.status]: [...prev[newVehicle.status], addedVehicle]
    }));

    setNewVehicle({ brand: '', model: '', plate: '', status: 'available' }); // Resetuj obrazac
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div className="kanban-column" {...provided.droppableProps} ref={provided.innerRef}>
                  <h2 className="kanban-title">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                  {vehicles[status].map((vehicle, index) => (
                    <Draggable key={vehicle.id} draggableId={vehicle.id} index={index}>
                      {(provided) => (
                        <div
                          className="kanban-card"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <p className="vehicle-info"><strong>{vehicle.brand} {vehicle.model}</strong></p>
                          <p className="vehicle-plate">Plate: {vehicle.plate}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
