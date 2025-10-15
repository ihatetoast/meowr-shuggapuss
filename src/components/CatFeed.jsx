import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';

import ImageCard from './ImageCard';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

const CatFeed = () => {
  const [kittehs, setKittehs] = useState([]);
  // useRef to help reduce the double dipping because of strict mode to keep
  // the free api free and happy
  const hasFetched = useRef(false);

  async function getRandomKittehs() {
    setKittehs([]);

    try {
      const requestOptions = {
        headers: {
          'content-type': 'application/json',
          'x-api-key': API_KEY,
        },
      };
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=15&has_breeds=1',
        requestOptions
      );
      const json = await response.json();
      setKittehs(json);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    // stops second load:
    if (hasFetched.current) return;
    // first load:
    hasFetched.current = true;
    getRandomKittehs();
  }, []);

  return (
    <Container>
      <Typography
        variant='h2'
        align='center'
        sx={{ color: deepPurple[800], fontSize: 36, fontWeight: 'medium' }}
      >
        Available ShuggaPusses
      </Typography>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: 'space-around',
          pt: 3
        }}
      >
        {kittehs &&
          kittehs.map((kitteh) => (
          <ImageCard key={kitteh.id} data={kitteh} />))}
      </Grid>
      <Box textAlign={'center'}>
        {kittehs.length === 0 && <CircularProgress />}
      </Box>
    </Container>
  );
};

export default CatFeed;
