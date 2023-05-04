import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

const mergedCars = carsFromServer.map(car => {
  const color = colorsFromServer.find(c => c.id === car.colorId);

  return {
    color,
    ...car,
  };
});

export const App: React.FC = () => {
  const [findCarId, setFindCarId] = useState('');

  let visibleCars = [...mergedCars];

  if (findCarId) {
    const carToLowerCase = findCarId.toLowerCase().trim();

    visibleCars = visibleCars
      .filter(car => car.brand.toLowerCase().includes(carToLowerCase));
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={findCarId}
        onChange={(event) => setFindCarId(event.target.value)}
      />

      <select>
        <option>Chose a color</option>
        {colorsFromServer.map(color => (
          <option>{color.name}</option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>

          {visibleCars.map(car => (
            <tr>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td>{car.color?.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
