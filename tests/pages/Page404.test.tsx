import React from "react";
import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"

import Page404 from "../../src/pages/Page404";

describe('Page404', () => {
  it("renders properly", () => {
    render(<Page404 />);
  
    const element = screen.getByText(/page not found/i);

    expect(element).toBeInTheDocument();
  })
})
