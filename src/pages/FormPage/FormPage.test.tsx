import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import FormPage from './FormPage';

describe('Test for form', () => {
  it('should render form', async () => {
    render(<FormPage />);
    const form = await screen.findByTestId('form');
    expect(form).toBeInTheDocument();
  })
})
describe('test for inputs', () => {
  it('change name input', async () => {
    render(<FormPage />);
    const input = await screen.findByTestId('name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "testValue" } });
    expect(input.value).toBe("testValue");
  });
  it('change last name input', async () => {
    render(<FormPage />);
    const input = await screen.findByTestId('lastName') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "testValue" } });
    expect(input.value).toBe("testValue");
  });
  it('change last countries', async () => {
    render(<FormPage />);
    const input = await screen.findByTestId('lastName') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "testValue" } });
    expect(input.value).toBe("testValue");
  });
})