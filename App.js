import React, { useState } from 'react';
import BibleView from './assets/views/BibleView';
import HymnalView from './assets/views/HymnalView';
import MenuView from './assets/views/MenuView';

const App = () => {
  const [book, setBook] = useState(null);

  const openMenu = (selectedBook) => {
    setBook(selectedBook ?? null);
  };

  const openBible = () => {
    openMenu('bible');
  };

  const openHymnal = () => {
    openMenu('hymnal');
  };

  switch (book) {
    case 'bible':
      return <BibleView openMenu={openMenu} />;
    case 'hymnal':
      return <HymnalView openMenu={openMenu} />;
    default:
      return <MenuView openBible={openBible} openHymnal={openHymnal} />;
  }
};

export default App;
