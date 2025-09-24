import React from 'react';
import '../styles/globals.css';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My Sanity CMS App</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Sanity CMS App</p>
      </footer>
    </div>
  );
};

export default Layout;