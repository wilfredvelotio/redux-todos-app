import React from "react";
import { render, screen } from "@testing-library/react";
import User from "src/Components/Users/Users";
import { Provider } from "react-redux";
import { store } from "src/redux/store";

test("renders learn react link", () => {
  const { debug } = render(
    <Provider store={store}>
      <User />
    </Provider>
  );
  debug();
  const linkElement = screen.getByText(/todos and posts app/i);
  expect(linkElement).toBeInTheDocument();
});
