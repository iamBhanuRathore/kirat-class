import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Signup from "./SignUp";

const mockStore = configureStore([]);
const store = mockStore({
  auth: { isAuthenticated: false },
});

describe("Signup Component", () => {
  test("renders Signup form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByTitle(/sign up/i)).toBeInTheDocument();
  });

  test("allows the user to sign up", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTitle(/sign up/i));
  });
});
