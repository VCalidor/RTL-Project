import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Testa o componente NotFound.js', () => {
  it('A pagina deve conter um H2 com o texto "Page requested not found 😭"', () => {
    render(<NotFound />);
    const string = screen.getByText(/Page requested not found/i);
    expect(string).toBeInTheDocument();
  });
  it('A pagina deve exibir a imagem com a URl da variável url', () => {
    render(<NotFound />);
    const img = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i });
    expect(img).toHaveAttribute('src', url);
  });
});
