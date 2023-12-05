import React from 'react';

function Header(props) {
  const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  };

  const h1Style = {
    margin: '0',
  };

  return (
    <header style={headerStyle}>
      <h1 style={h1Style}>City Explorer</h1>
    </header>
  );
}

export default Header;