import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Pokemon } from '../components';
import App from '../App';
import renderWithRouter from '../renderWIthRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  it('O nome correto do pokemon deve ser mostrado na tela', () => {
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />, { wrapper: BrowserRouter });
    const correctName = screen.getByText(pokemons[0].name);
    expect(correctName).toBeDefined();
  });
  it('O tipo correto do pokemon deve ser mostrado na tela', () => {
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />, { wrapper: BrowserRouter });
    const correctType = screen.getByText(pokemons[0].type);
    expect(correctType).toBeDefined();
  });
  it('O peso médio do pokemon deve ser exibido com um texto', () => {
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />, { wrapper: BrowserRouter });
    const p = pokemons[0].averageWeight;
    const weight = screen.getByText(`Average weight: ${p.value} ${p.measurementUnit}`);
    expect(weight).toBeDefined();
  });
  it('A imagem do pokémon deve ser exibido', () => {
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />, { wrapper: BrowserRouter });
    const img = screen.getByRole(
      'img',
      { name: /Pikachu sprite/i },
    );
    expect(img).toHaveAttribute('src', pokemons[0].image);
  });
  it('O card do pokémon contem um link para detalhes do pokemon', () => {
    render(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />, { wrapper: BrowserRouter });
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeDefined();
  });
  it('Ao clicar no link de navegação é redirecionado para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(link);
    console.log(`/pokemon/${pokemons[0].id}`);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
  it('Testa o icone de estrela dos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(link);
    const favoritado = screen.getByRole('checkbox', { id: /favorite/i });
    fireEvent.click(favoritado);
    const img = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});
