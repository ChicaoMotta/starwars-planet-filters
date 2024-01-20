import React, { useContext } from 'react';
import context from '../context/context';

export default function TextFilter() {
  const { setInput, input } = useContext(context);

  const handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    setInput({ ...input, [name]: value });
  };

  return (
    <label htmlFor="filter" className="mb-4">
      Filtrar por nome:
      <input
        data-testid="name-filter"
        name="filter"
        type="text"
        onChange={ handleChange }
        value={ input.filter }
        className="ms-3 px-5"
        id="filter"
      />
    </label>
  );
}
