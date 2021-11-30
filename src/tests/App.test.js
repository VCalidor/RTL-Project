import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWIthRouter';

describe('Testa o componente App.js', () => {
  it('O primeiro link deve ter o texto "Home"', () => {
    render(<App />, { wrapper: BrowserRouter });
    const firstLink = screen.getByRole('link', { name: /Home/i });
    expect(firstLink).toBeInTheDocument();
  });

  it('O primeiro link deve redirecionar para a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: /Home/i });
    fireEvent.click(firstLink);
    expect(history.location.pathname).toBe('/');
  });

  it('O segundo link deve ter o texto "About"', () => {
    render(<App />, { wrapper: BrowserRouter });
    const secondLink = screen.getByRole('link', { name: /About/i });
    expect(secondLink).toBeInTheDocument();
  });

  it('O segundo link deve redirecionar para a pagina de about', () => {
    const { history } = renderWithRouter(<App />);
    const secondLink = screen.getByRole('link', { name: /About/i });
    fireEvent.click(secondLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('O terceiro link deve ter o texto "Favorite Pokemons"', () => {
    render(<App />, { wrapper: BrowserRouter });
    const thirdLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(thirdLink).toBeInTheDocument();
  });

  it('O terceiro link deve redirecionar para a pagina de pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const thirdLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(thirdLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Caso link desconhecido a aplicação é direcionada para a pagina not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/ulalal');
    const pageNotFound = screen.getByRole('heading', {
      name: /page requested not found/i });

    expect(pageNotFound).toBeInTheDocument();
  });
});
