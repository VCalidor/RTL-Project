import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente FavoritePokemons.js', () => {
  it('Exibe a mensagem "No favorite pokemon found" se não tiver favoritos', () => {
    render(<FavoritePokemons pokemons={ [] } />);
    const noFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  it('Exibe os pokemons favoritos se tiver favoritos', () => {
    const pokemonsArray = [{
      averageWeight: {
        measurementUnit: 'kg',
        value: '8.5',
      },
      foundAt: [
        {
          location: 'Alola Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 4',
          map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
        },
        {
          location: 'Kanto Rock Tunnel',
          map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
        },
      ],
      id: 4,
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      name: 'Charmander',
      summary: 'The flame on its tail shows the strength of its life force.',
      type: 'Fire',
    }];
    render(<FavoritePokemons pokemons={ pokemonsArray } />, { wrapper: BrowserRouter });
    const charmander = screen.getByText(/Charmander/i);
    const charmanderType = screen.getByText(/Fire/i);
    const charmanderImage = screen.getByRole('img', { name: 'Charmander sprite' });
    expect(charmander && charmanderType && charmanderImage).toBeInTheDocument();
  });
});
