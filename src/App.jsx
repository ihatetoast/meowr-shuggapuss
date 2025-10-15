import { useState } from 'react';

import { CssBaseline, Box } from '@mui/material';
import NavBar from './components/NavBar.jsx';
import CatFeed from './components/CatFeed.jsx';
import FavouritedCats from './components/FavouritedCats';
import './App.css';

function App() {
  const [showFavouritesView, setShowFavouritesView] = useState(false);

  return (
    <>
      <CssBaseline />
      <Box>
        <NavBar onViewChange={setShowFavouritesView}/>
        {showFavouritesView ? <FavouritedCats /> : <CatFeed />}
      </Box>
    </>
  );
}

export default App;
