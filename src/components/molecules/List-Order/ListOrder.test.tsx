import { render, screen, fireEvent } from '@testing-library/react';
import ListOrder from './ListOrder';

describe('ListOrder', () => {
 
  test('ejecuta ascendantOrder cuando se hace click en A - Z', () => {
    const ascendantMock = jest.fn();
    render(<ListOrder ascendantOrder={ascendantMock} descendantOrder={() => {}} />);
    
    const button = screen.getByText('A - Z');
    fireEvent.click(button);

    expect(ascendantMock).toHaveBeenCalledTimes(1);
  });

  test('ejecuta descendantOrder cuando se hace click en Z - A', () => {
    const descendantMock = jest.fn();
    render(<ListOrder ascendantOrder={() => {}} descendantOrder={descendantMock} />);
    
    const button = screen.getByText('Z - A');
    fireEvent.click(button);

    expect(descendantMock).toHaveBeenCalledTimes(1);
  });
});
