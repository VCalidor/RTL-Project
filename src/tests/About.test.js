import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  it('A pagina deve conter informações sobre a Pokedex', () => {
    render(<About />);
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('A pagina deve conter dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraph1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia/,
    );
    const paragraph2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    expect(paragraph1 && paragraph2).toBeInTheDocument();
  });

  it('A pagina deve conter uma imagem com a url da variável "url"', () => {
    render(<About />);
    const img = screen.getByRole('img', {
      name: /pokédex/i });
    expect(img).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
