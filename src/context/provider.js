import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import context from './context';

const INITIAL_FILTER_STATE = {
  fields: null,
  comparison: null,
  number: null,
};

function Provider({ children }) {
  const [state, setState] = useState('');
  const [input, setInput] = useState({ filter: '' });
  const [numericFilter, setNumericFilter] = useState(INITIAL_FILTER_STATE);
  const [activeFilters, setActiveFilters] = useState([]);

  const fetchAPI = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    const editedData = data.results.map((planets) => {
      delete planets.residents;
      return planets;
    });
    return editedData;
  };

  useEffect(() => {
    const getPlanets = async () => {
      const fetchPlanets = await fetchAPI();
      const getKeys = Object.keys(fetchPlanets[0]);
      const planetsFetchedState = {
        planetsList: fetchPlanets,
        tableHeader: getKeys,
      };
      setState(planetsFetchedState);
    };

    getPlanets();
  }, []);

  return (
    <context.Provider
      value={{
        ...state,
        input,
        setInput,
        numericFilter,
        setNumericFilter,
        setActiveFilters,
        activeFilters,
      }}
    >
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
