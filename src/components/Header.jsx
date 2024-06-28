import React from 'react';

function Header({ logo, favoriteCount }) {
  return (
    <header className="app-header">
        <h1>Pokédex</h1>
        <p>Favorites: <span className="favorite-count">{favoriteCount}</span></p>
    </header>
  );
}

export default Header;
