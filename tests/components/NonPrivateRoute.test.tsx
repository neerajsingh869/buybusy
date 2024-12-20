import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";
import { createMemoryRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NonPrivateRoute from "../../src/components/NonPrivateRoute";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    Navigate: vi.fn(() => null),
  };
});

const createMockStore = (userUid: string | null) => {
  return configureStore({
    reducer: {
      userReducer: () => ({ userUid }),
    },
  });
};

const NonPrivateComponent = () => <div>Non Private Component</div>;

describe("NonPrivateRoute", () => {
  it("should render the children when user is not authenticated", () => {
    const store = createMockStore(null);

    const routes = [
      {
        path: "/",
        children: [
          {
            path: "non-protected",
            element: (
              <NonPrivateRoute>
                <NonPrivateComponent />
              </NonPrivateRoute>
            ),
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/non-protected"],
      initialIndex: 0,
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByText("Non Private Component")).toBeInTheDocument();
    expect(Navigate).not.toHaveBeenCalled();
  });

  it("should not ender the children when user not authenticated", () => {
    const store = createMockStore("test-useruid");

    const routes = [
      {
        path: "/",
        children: [
          {
            path: "non-protected",
            element: (
              <NonPrivateRoute>
                <NonPrivateComponent />
              </NonPrivateRoute>
            ),
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/non-protected"],
      initialIndex: 0,
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(Navigate).toHaveBeenCalledWith(
      { to: "/", replace: true },
      expect.any(Object)
    );
    expect(screen.queryByText("Non Private Component")).not.toBeInTheDocument();
  });
});
