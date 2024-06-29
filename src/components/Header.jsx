import React from 'react';

function Header({ favoriteCount }) {
  return (
    <header className="app-header">
        <h1>Pokédex</h1>
        <p>Favorites: <span className="favorite-count">{favoriteCount}</span></p>
    </header>
  );
}

export default Header;
