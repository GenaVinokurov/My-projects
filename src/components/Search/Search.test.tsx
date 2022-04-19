import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import Main from "../../pages/Main/Main";

it('should render  input', async () => {
  render(<Main />);
  const input = await screen.findByTestId('input-search');
  expect(input).toBeTruthy();
});

it('should render  button', async () => {
  render(<Main />);
  const button = await screen.findByTestId('button-search');
  expect(button).toBeTruthy();
});

describe('Search or Search component', () => {
  it('onChange', async () => {
    render(<Main />);
    const input = await screen.findByTestId('input-search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "testValue" } });
    expect(input.value).toBe("testValue");
  });
})