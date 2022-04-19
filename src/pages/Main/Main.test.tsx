import { render, screen } from '@testing-library/react';
import Main from './Main';
import React from 'react'

describe('mainTest', () => {
  it('test 1 card', async () => {
    render(<Main />);
    const cardElement = await screen.findByTestId('item-Angola');
    expect(cardElement).toBeInTheDocument();
  })
  it('test all cards', async () => {
    render(<Main />);
    setTimeout(() => {
      const cardElements = screen.getAllByTestId(/card/i);
      expect(cardElements.length).toBe(250);
    }, 3000)
  })
})