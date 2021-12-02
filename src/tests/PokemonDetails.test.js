import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWIthRouter';
import pokemons from '../data';

describe('Testa o componente pokemonDetails.js', () => {
  it('Se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(link);

    const text = screen.getByText(`${pokemons[0].name} Details`);
    expect(text).toBeInTheDocument();

    const noExiste = screen.queryByRole('link', { name: /More Details/i });
    expect(noExiste).not.toBeInTheDocument();

    const h2 = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(h2).toBeInTheDocument();
  });
  it('Se existe na página uma seção com os mapas com localizações do pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(link);
    const p = pokemons[0];

    const h2 = screen.getByRole(
      'heading',
      { level: 2, name: `Game Locations of ${p.name}` },
    );
    expect(h2).toBeInTheDocument();

    const arrayLocations = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(arrayLocations.length).toBe(p.foundAt.length);

    const map = screen.getAllByRole('img', { name: /Pikachu location/ });
    p.foundAt.forEach((location, index) => {
      const localization = screen.getByText(location.location);
      expect(localization && map[index]).toBeInTheDocument();
      expect(map[index]).toHaveAttribute('src', p.foundAt[index].map);
      expect(map[index].alt).toBe(`${p.name} location`);
    });
  });
  it('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(link);

    const checkBox = screen.getByRole('checkbox', { id: /favorite/i });
    fireEvent.click(checkBox);

    const star = screen.queryByRole('img', { name: /Pikachu is marked as favorite/ });
    expect(star).toBeInTheDocument();
    fireEvent.click(checkBox);
    const star2 = screen.queryByRole('img', { name: /Pikachu is marked as favorite/ });
    expect(star2).not.toBeInTheDocument();
    fireEvent.click(checkBox);
    const star3 = screen.queryByRole('img', { name: /Pikachu is marked as favorite/ });
    expect(star3).toBeInTheDocument();

    const label = screen.getByText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
  });
});
