import React, { useContext, useState } from 'react';
import context from '../context/context';

const FIELD_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function TableFilters() {
  const { setNumericFilter, setActiveFilters, activeFilters } = useContext(context);
  const [optionFields, setOptionFields] = useState(FIELD_OPTIONS);
  const [localFilter, setLocalFilter] = useState({
    fields: optionFields[0],
    comparison: 'maior que',
    number: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumericFilter({ ...localFilter });
    const filterdFields = optionFields.filter(
      (field) => localFilter.fields !== field,
    );
    setOptionFields(filterdFields);
    setLocalFilter({ ...localFilter, fields: filterdFields[0] });
    setActiveFilters([...activeFilters, { ...localFilter }]);
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    setLocalFilter({ ...localFilter, [name]: value });
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setOptionFields(FIELD_OPTIONS);
    setLocalFilter({ ...localFilter, fields: FIELD_OPTIONS[0] });
  };

  const deleteSelectedFilter = (e) => {
    const { parentNode: { id } } = e.target;
    setOptionFields([...optionFields, id]);
    const newActiveFilters = activeFilters.filter((filter) => filter.fields !== id);
    setActiveFilters(newActiveFilters);
  };

  return (
    localFilter && (
      <>
        <label htmlFor="" className="d-flex flex-column gap-1">
          Filtrar por categoria:
          <select
            name="fields"
            id="fields"
            data-testid="column-filter"
            value={ localFilter.fields }
            onChange={ handleChange }
            className=""
          >
            {optionFields.map((field) => (
              <option key={ field } value={ field }>
                {field}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="" className="d-flex flex-column gap-1">
          Tipo de comparação:
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
            value={ localFilter.comparison }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="" className="d-flex flex-column gap-1">
          Número para filtrar:
          <input
            type="text"
            name="number"
            data-testid="value-filter"
            value={ localFilter.number }
            onChange={ handleChange }
          />
        </label>
        <button data-testid="button-filter" onClick={ handleSubmit } className="py-3 px-4 ">
          Filtrar
        </button>
        <button onClick={ resetFilters } data-testid="button-remove-filters" className="py-3 px-4 ">
          Remover todas filtragens
        </button>
        {activeFilters.map((filter, index) => (
          <div key={ index } id={ filter.fields } data-testid="filter" className="col-12 m-3">
            {`${filter.fields} ${filter.comparison} ${filter.number}`}
            <button onClick={ deleteSelectedFilter }>X</button>
          </div>
        ))}
      </>
    )
  );
}
