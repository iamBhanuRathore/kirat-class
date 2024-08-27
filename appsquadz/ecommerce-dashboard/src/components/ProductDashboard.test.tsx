import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDashboard from "./ProductDashboard";

const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    isAuthenticated: true,
    user: { username: "test", email: "test@test.com" },
  },
});

const queryClient = new QueryClient();

describe("ProductDashboard Component", () => {
  test("renders product dashboard", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ProductDashboard />
        </QueryClientProvider>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText(/search by name here/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
