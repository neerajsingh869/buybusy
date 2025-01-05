import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loader from "../../src/components/Loader";

describe("Loader Component", () => {
  it("should render the loader component with correct props", () => {
    render(<Loader />);

    const dotLoader = screen.getByTestId("loader");

    expect(dotLoader).toBeInTheDocument();
    expect(dotLoader).toHaveAttribute("aria-label", "Loading Spinner");
  });

  it("should be properly centered in the viewport", () => {
    render(<Loader />);

    const dotLoaderWrapper = screen.getByTestId("loader").parentElement;

    expect(dotLoaderWrapper).toHaveClass(
      "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
      { exact: true }
    );
  });
});
