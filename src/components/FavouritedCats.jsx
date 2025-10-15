import { useEffect, useRef, useState } from 'react';
import { Container, Grid, Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { deepPurple, red } from '@mui/material/colors';

import { generateKittehs } from '../utils/catObjectGenerator';
import ImageCard from './ImageCard';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const STORAGE_KEY = 'mock_fav_cats';

const FavouritedCats = () => {
  const [favKittehs, setFavKittehs] = useState([]);
  const [mockKittehData, setMockKittehData] = useState([]);

  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // oof. try to not mess up the fav names on unfavouriting
  // so. much. regret.
  async function onUnfavourite(favouriteId) {
    // remove from the fetched favourites:
    setFavKittehs((prevFavs)=>{
      const updatedFavourited = prevFavs.filter(fav => fav.favouriteId !== favouriteId);
      return updatedFavourited;
    })
    //setFavKittehs(favKittehs.filter((fav) => fav.favouriteId !== favouriteId));

    setMockKittehData((prevMocks) => {
    // find the index of the dissed cat in the current list
    const indexToRemove = favKittehs.findIndex(
      (fav) => fav.favouriteId === favouriteId
    );

    if (indexToRemove === -1) return prevMocks;

    const updatedMocks = [
      ...prevMocks.slice(0, indexToRemove),
      ...prevMocks.slice(indexToRemove + 1),
    ];
    // LOCAL STORAGE: Remove mock data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMocks));
    return updatedMocks;
  });
  }

  async function getFavouriteKittehs() {
    setLoading(true);
    setError(null);
    // empty first
    setFavKittehs([]);

    try {
      const requestOptions = {
        headers: {
          'content-type': 'application/json',
          'x-api-key': API_KEY,
        },
      };
      const response = await fetch(
        'https://api.thecatapi.com/v1/favourites?order=DESC',
        requestOptions
      );
      const json = await response.json();

      // NEED TO CHANGE WHAT WE GET FROM FAVS TO MATCH THE OG DATA
      // SO OUR CARDS GET THE SAME STRUCTURE.
      const restructuredData = json.map((favourite) => {
        return {
          id: favourite.image.id, // image id
          url: favourite.image.url,
          breeds: favourite.image.breeds || [],
          favouriteId: favourite.id, // unique favourite id for key
          favourite: favourite, // keep full favourite info
        };
      });

      setFavKittehs(restructuredData);
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // LOCAL STORAGE: load if there
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMockKittehData(JSON.parse(stored));
    }
  }, []);
  // gen mock data only if kittehs amt changes
  useEffect(() => {
    if (favKittehs.length > 0) {
      setMockKittehData((prev) => {
        // if what i have now is less than, no need to redo:
        if (prev.length >= favKittehs.length) {
          return prev;
        }

        const newFavs = generateKittehs(favKittehs.length - prev.length);
        // add to begining bc of DESC
        const combined = [...newFavs, ...prev];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
        return combined;
      });
    }
  }, [favKittehs.length]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getFavouriteKittehs();
  }, []);

  return (
    <Container>
      <Typography
        variant='h2'
        align='center'
        sx={{ color: deepPurple[800], fontSize: 36, fontWeight: 'medium' }}
      >
        Your ShuggaPusses you pspspsed on
      </Typography>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: 'space-around',
          pt: 3,
        }}
      >
        {favKittehs.length > 0 &&
          mockKittehData.length >= favKittehs.length &&
          favKittehs.map((kitteh, idx) => (
            <ImageCard
              key={kitteh.favouriteId}
              data={kitteh}
              favData={mockKittehData[idx]}
              onUnfavourite={onUnfavourite}
              isFavouriteView
            />
          ))}
      </Grid>
      <Box textAlign={'center'} sx={{ pt: 10 }}>
        {loading && (
          <CircularProgress size='30px' sx={{ color: deepPurple[800] }} />
        )}
        {!loading && favKittehs.length === 0 && !error && (
          <Typography variant='h6' sx={{ color: red[900] }}>
            Hiss! You haven't favourited any ShuggaPusses yet 😿. WHat are you
            waiting for? Get to pspspsing!
          </Typography>
        )}
        {error && (
          <Typography variant='h6' sx={{ color: red[900] }}>
            Uh oh. There's a problem. Could be a full litterbox, fleas, or{' '}
            {error}.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default FavouritedCats;
