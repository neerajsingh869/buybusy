import React from "react";
import { describe, it, expect } from "vitest";
import { screen, render, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import Order from "../../src/components/Order";
import { Order as OrderType } from "../../src/types";

// Create mock data for an Order
const mockOrder: OrderType = {
  orderedOn: "2024-12-12",
  id: 1733994198658,
  products: [
    {
      category: "electronics",
      image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      qty: 2,
      price: 70000,
      id: "7vbHNmY3GD0VohkipUX2",
      title: "Samsung 49-Inch CHG90 144Hz Curved ...",
    },
    {
      qty: 2,
      price: 900,
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      title: "Mens Casual Slim Fit...",
      id: "400651zf49cvFvBTmkAN",
      category: "men",
    },
    {
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      price: 2599,
      category: "women",
      id: "30GuLN5UamOeMmwRbS4e",
      title: "Lock and Love Women's Removable Hoo...",
      qty: 4,
    },
  ],
  totalPrice: 152196,
};

describe("Order", () => {
  it("should show ordered on date", () => {
    render(<Order order={mockOrder} />);

    const orderedOnParagraph = screen.getByRole("paragraph");

    expect(orderedOnParagraph).toBeInTheDocument();
    expect(orderedOnParagraph.textContent).toBe(
      `Ordered On:- ${mockOrder.orderedOn}`
    );
  });

  it("should have table to show order details", () => {
    render(<Order order={mockOrder} />);

    const orderTable = screen.getByRole("table");

    expect(orderTable).toBeInTheDocument();
  });

  it("should have table header, body and footer", () => {
    render(<Order order={mockOrder} />);

    const orderTable = screen.getByRole("table");
    const orderTableGroup = within(orderTable).getAllByRole("rowgroup");

    expect(orderTableGroup).toHaveLength(3);
  });

  it("should have required table column headers", () => {
    render(<Order order={mockOrder} />);

    const orderTable = screen.getByRole("table");
    const orderTableHeader = within(orderTable).getAllByRole("columnheader");

    expect(orderTableHeader).toHaveLength(4);
    expect(orderTableHeader[0].textContent).toBe("Title");
    expect(orderTableHeader[1].textContent).toBe("Price");
    expect(orderTableHeader[2].textContent).toBe("Quantity");
    expect(orderTableHeader[3].textContent).toBe("Total Price");
  });

  it("should show order product's details", () => {
    render(<Order order={mockOrder} />);

    const orderTable = screen.getByRole("table");

    const orderTableGroup = within(orderTable).getAllByRole("rowgroup");
    const orderTableBody = orderTableGroup[1];
    const orderTableBodyRows = within(orderTableBody).getAllByRole("row");

    expect(orderTableBodyRows).toHaveLength(mockOrder.products.length);

    orderTableBodyRows.forEach((productRow: HTMLElement, index: number) => {
      const productRowColumns = within(productRow).getAllByRole("cell");

      expect(productRowColumns).toHaveLength(4);
      expect(productRowColumns[0].textContent).toBe(
        `${mockOrder.products[index].title}`
      );
      expect(productRowColumns[1].textContent).toBe(
        `₹ ${mockOrder.products[index].price}`
      );
      expect(productRowColumns[2].textContent).toBe(
        `${mockOrder.products[index].qty}`
      );
      expect(productRowColumns[3].textContent).toBe(
        `₹ ${mockOrder.products[index].price * mockOrder.products[index].qty}`
      );
    });
  });

  it("should show total price of order in table footer section", () => {
    render(<Order order={mockOrder} />);

    const orderTable = screen.getByRole("table");
    const orderTableGroup = within(orderTable).getAllByRole("rowgroup");
    const orderTableFooterRow = within(orderTableGroup[2]).getByRole("row");

    expect(orderTableFooterRow).toBeInTheDocument();
    expect(orderTableFooterRow.textContent).toBe(`₹ ${mockOrder.totalPrice}`);
  });
});
