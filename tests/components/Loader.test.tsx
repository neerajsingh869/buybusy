import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loader from "../../src/components/Loader";

describe("Loader", () => {
  it("should show dot loader", () => {
    render(<Loader />);

    const dotLoader = screen.getByTestId("loader");

    expect(dotLoader).toBeInTheDocument();
  });
});
