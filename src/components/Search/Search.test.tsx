import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "./Search";
import Main from "../../pages/Main/Main";

it('should render  input', async () => {
  render(<Main />);
  render(<Search />);
  const input = await screen.findByTestId('input-search');
  expect(input).toBeTruthy();
});

it('should render  button', () => {
  const { queryByTitle } = render(<Search />);
  const button = queryByTitle('button');
  expect(button).toBeTruthy();
});

describe('Search or Search component', () => {
  it('onChange', () => {
    const { queryByTitle } = render(<Search />);
    const input = queryByTitle('search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "testValue" } });
    expect(input.value).toBe("testValue");
  });
})