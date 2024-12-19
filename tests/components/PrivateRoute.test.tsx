import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider, Navigate } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PrivateRoute from "../../src/components/PrivateRoute";

// Mock the Navigate component
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    Navigate: vi.fn(() => null),
  };
});

// Create a mock store
const createMockStore = (userUid: string | null) => {
  return configureStore({
    reducer: {
      userReducer: () => ({ userUid }),
    },
  });
};

// Test component to render inside PrivateRoute
const ProtectedComponent = () => <div>Protected Component</div>;

// Write test cases
describe("PrivateRoute", () => {
  it("should render children when user is authenticated", () => {
    // Arrange
    const store = createMockStore("test-useruid");

    // Create route configurations
    const routes = [
      {
        path: "/",
        children: [
          {
            path: "protected",
            element: (
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            ),
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/protected"],
      initialIndex: 0,
    });

    // Act
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Assert
    expect(screen.getByText("Protected Component")).toBeInTheDocument();
    expect(Navigate).not.toHaveBeenCalled();
  });

  it("should redirect to home page when user is not authenticated", () => {
    // Arrange
    const store = createMockStore(null);

    // Create route configurations
    const routes = [
      {
        path: "/",
        children: [
          {
            path: "protected",
            element: (
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            ),
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/protected"],
      initialIndex: 0,
    });

    // Act
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    // Assert
    expect(Navigate).toHaveBeenCalledWith(
      { to: "/", replace: true },
      expect.any(Object)
    );
    expect(screen.queryByText("Protected Component")).not.toBeInTheDocument();
  });
});
