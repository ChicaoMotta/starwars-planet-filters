import React, { useContext } from 'react';
import context from '../context/context';

export default function Table() {
  const {
    tableHeader,
    planetsList,
    input: { filter },
    activeFilters,
  } = useContext(context);
  return (
    <table className="table">
      {console.log(tableHeader)}
      <thead>
        <tr>
          {tableHeader
    && tableHeader.map((title, id) => {
      if (id <= 8) {
        return (
          <th key={ title } style={ { padding: '10px' } } scope="col">
            {title}
          </th>
        );
      }
      return null; // or you can use an empty string, depending on your requirements
    })}
        </tr>
      </thead>
      <tbody>
        {planetsList
          && planetsList
            .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
            .filter((planets) => {
              const renderWithFilters = [];
              activeFilters.forEach(({ comparison, number, fields }) => {
                switch (comparison) {
                case 'maior que':
                  renderWithFilters.push(
                    Number(planets[fields]) > Number(number),
                  );
                  break;
                case 'menor que':
                  renderWithFilters.push(
                    Number(planets[fields]) < Number(number),
                  );
                  break;
                case 'igual a':
                  renderWithFilters.push(
                    Number(planets[fields]) === Number(number),
                  );
                  break;
                default:
                  return true;
                }
              });
              return renderWithFilters.every((savedFilter) => savedFilter);
            })
            .map((planets, index) => (
              <tr key={ index } id={ planets.name }>
                <td>{planets.name}</td>
                <td>{planets.rotation_period}</td>
                <td>{planets.orbital_period}</td>
                <td>{planets.diameter}</td>
                <td>{planets.climate}</td>
                <td>{planets.gravity}</td>
                <td>{planets.terrain}</td>
                <td>{planets.surface_water}</td>
                <td>{planets.population}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
