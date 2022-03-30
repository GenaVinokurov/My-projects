import { render, screen } from '@testing-library/react';
import Main from './Main';
import React from 'react'

describe('mainTest', () => {
  it('test 1 card', async () => {
    render(<Main />);
    const cardElement = await screen.findByTestId('card-Angola');
    expect(cardElement).toBeInTheDocument();
  })
  it('test all cards', async () => {
    render(<Main />);
    const cardElements = await screen.findAllByTestId(/card/i);
    expect(cardElements.length).toBe(250);
  })
})