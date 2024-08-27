import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "./Login";

const mockStore = configureStore([]);
const store = mockStore({
  auth: { isAuthenticated: false },
});

describe("Login Component", () => {
  test("renders Login form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByTitle(/login/i)).toBeInTheDocument();
  });

  test("allows the user to log in", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTitle(/login/i));
  });
});
