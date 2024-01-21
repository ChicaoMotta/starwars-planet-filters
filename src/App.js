import React from 'react';
import Table from './components/Table';
import TextFilter from './components/TextFilter';
import TableFilters from './components/TableFilters';
import logo from './img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <section className="mb-5">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 m-5 text-center bg-dark">
            <img src={logo} alt="" />
          </div>
          <div className="col-md-12">
            <TextFilter />
          </div>
          <div className="col-md-12 mb-4 d-flex flex-row flex-wrap align-items-center justify-content-evenly">
            <TableFilters />
          </div>
          <div className="col-md-12">
            <Table />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
