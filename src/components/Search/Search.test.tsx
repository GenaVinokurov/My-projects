import { render, fireEvent } from "@testing-library/react";
import Search from "./Search";

it('searchRenderCheck', () => {
  const { queryByTitle } = render(<Search />);
  const input = queryByTitle('search');
  expect(input).toBeTruthy();
});

it('buttonRenderCheck', () => {
  const { queryByTitle } = render(<Search />);
  const button = queryByTitle('button');
  expect(button).toBeTruthy();
});

describe('changeInput', () => {
  it('onChange', () => {
    const { queryByTitle } = render(<Search />);
    const input = queryByTitle('search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "testValue" } });
    expect(input.value).toBe("testValue");
  });
})