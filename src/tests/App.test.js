import React from "react";
import { findAllByRole, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import testData from "../../cypress/mocks/testData";
import App from "../App";
import Provider from "../context/provider";

describe("Teste geral do app", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Testing filter renders", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(global.fetch).toHaveBeenCalled();

    const inputElement = screen.getByTestId("name-filter");
    expect(inputElement).toBeInTheDocument();
    const fieldsElement = screen.getByTestId("column-filter");
    expect(fieldsElement).toBeInTheDocument();
    const comparisonElement = screen.getByTestId("comparison-filter");
    expect(comparisonElement).toBeInTheDocument();
    const numericElement = screen.getByTestId("value-filter");
    expect(numericElement).toBeInTheDocument();
    const buttonElement = screen.getByTestId("button-filter");
    expect(buttonElement).toBeInTheDocument();
    // const removeButtonElement = screen.getByTestId("button-remove-filter");
    // expect(removeButtonElement).toBeInTheDocument();
  });

  it("Testing table", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    const planetArray = testData.results

    expect(screen.getByRole('table')).toBeInTheDocument();
    const tableHeader = await screen.findAllByRole('columnheader')
    expect(tableHeader.length).toBe(13)
    planetArray.forEach(({ name }) => {
      expect(screen.getByRole('cell', {
        name,
      })).toBeInTheDocument();
    });
  });

  it("Testing filters", async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    act(() => {
      userEvent.type(screen.getByTestId("name-filter"), "o");
    });
    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();

    expect(await screen.findByText(/hoth/i)).toBeInTheDocument();

    expect(await screen.queryByText(/Alderaan/i)).toBeNull();

    act(() => {
      userEvent.selectOptions(
        screen.getByTestId("column-filter"),
        screen.getByRole("option", { name: "rotation_period" })
      );
      userEvent.selectOptions(
        screen.getByTestId("comparison-filter"),
        screen.getByRole("option", { name: "menor que" })
      );
      userEvent.clear(screen.getByTestId("value-filter"))
      userEvent.type(screen.getByTestId("value-filter"), "25");
      userEvent.click(
        screen.getByRole("button", {
          name: /filter/i,
        })
      );
    });

    expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();
    expect(screen.queryByText(/Kamino/i)).toBeNull();
    expect(
      screen.getByText(/rotation_period menor que 25/i)
    ).toBeInTheDocument();

    act(() => {
      userEvent.selectOptions(
        screen.getByTestId("column-filter"),
        screen.getByRole("option", { name: "surface_water" })
      );
      userEvent.selectOptions(
        screen.getByTestId("comparison-filter"),
        screen.getByRole("option", { name: "maior que" })
      );
      userEvent.clear(screen.getByTestId("value-filter"))
      userEvent.type(screen.getByTestId("value-filter"), "20");
      userEvent.click(
        screen.getByRole("button", {
          name: /filter/i,
        })
      );
    });

    expect(await screen.findByText(/Hoth/i)).toBeInTheDocument();
    expect(screen.queryByText(/Kamino/i)).toBeNull();
    expect(screen.queryByText(/Tatooine/i)).toBeNull();
    expect(
      screen.getByText(/surface_water maior que 20/i)
    ).toBeInTheDocument();

    act(() => {
      userEvent.selectOptions(
        screen.getByTestId("column-filter"),
        screen.getByRole("option", { name: "diameter" })
      );
      userEvent.selectOptions(
        screen.getByTestId("comparison-filter"),
        screen.getByRole("option", { name: "igual a" })
      );
      userEvent.clear(screen.getByTestId("value-filter"))
      userEvent.type(screen.getByTestId("value-filter"), "7200");
      userEvent.click(
        screen.getByRole("button", {
          name: /filter/i,
        })
      );
    })

    expect(await screen.findByText(/Hoth/i)).toBeInTheDocument();
    expect(await screen.queryByText(/Alderaan/i)).toBeNull();
    expect(
      screen.getByText(/diameter igual a 7200/i)
    ).toBeInTheDocument();


    const deleteButton = within(screen.getByText(/diameter igual a 7200/i)).getByRole('button');

    act(() => {
      userEvent.click(deleteButton);
      userEvent.clear(screen.getByTestId('name-filter'))
    })
    expect(await screen.queryByText(/diameter igual a 7200/i)).toBeNull;

    expect(await screen.findByText(/Alderaan/i)).toBeInTheDocument();

    act(() => {
      userEvent.selectOptions(
        screen.getByTestId("column-filter"),
        screen.getByRole("option", { name: "population" })
      );
      userEvent.selectOptions(
        screen.getByTestId("comparison-filter"),
        screen.getByRole("option", { name: "igual a" })
      );
      userEvent.clear(screen.getByTestId("value-filter"))
      userEvent.type(screen.getByTestId("value-filter"), "asd");
      userEvent.click(
        screen.getByRole("button", {
          name: /filter/i,
        })
      );
    })

    expect(screen.queryByText(/Alderaan/i)).toBeNull();


    act(() => {
      userEvent.click(screen.getByRole('button', {
        name: /remover todas filtragens/i
      }))
    });
    expect(screen.queryByText(/Kamino/i)).toBeInTheDocument();
  });
});
