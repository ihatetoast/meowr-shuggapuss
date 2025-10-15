import { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { deepPurple, red } from '@mui/material/colors';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export default function ImageCard({
  data,
  favData,
  onUnfavourite,
  isFavouriteView,
}) {
  const [favourite, setFavourite] = useState(data.favourite);
  const derivedIsFavouriteView = isFavouriteView ?? !data.breeds?.length;
  // if coming from random feed, we will have the breed obj
  // if coming from favourites, breeds obj is not yet filled;
  const breed = data?.breeds?.[0];
  const name = breed?.name || 'Breed not given';
  const temperament = breed?.temperament || 'Temperament unknown';
  const temperamentString = convertTempramentToListWithAnd(temperament);
  const altNames = (breed?.alt_names || '').trim();

  async function handleToggleFavourites() {
    const isFavouriting = !favourite;

    if (isFavouriting) {
      // use var to keep it from being block scoped
      var rawBody = JSON.stringify({ image_id: data.id });
      const requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': API_KEY },
        body: rawBody,
      };
      const response = await fetch(
        'https://api.thecatapi.com/v1/favourites',
        requestOptions
      );
      const newFavourite = await response.json();
      setFavourite(newFavourite);
    } else {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', 'x-api-key': API_KEY },
        body: rawBody,
      };

      fetch(
        `https://api.thecatapi.com/v1/favourites/${favourite.id}`,
        requestOptions
      );
      onUnfavourite(favourite.id);
      setFavourite(null);
    }
  }

// there are many urls. fall back to wiki list of cat breeds.
// cfa first (no! all of theirs are 404) then vca, vet street, wiki for breed, wiki general
// check for an empty string in the obj or some other typo. 
const url =
  [breed?.vcahospitals_url, breed?.vetstreet_url, breed?.wikipedia_url].find(
    (link) => typeof link === 'string' && link.trim() !== ''
  ) || 'https://en.wikipedia.org/wiki/List_of_cat_breeds';
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        mb:3,
        maxWidth: 345,
        minWidth: 300,
      }}
    >
      {!derivedIsFavouriteView && (
        <CardHeader
          title={name}
          sx={{ color: red[900] }}
          subheader={
            <Typography color='text.secondary' sx={{ fontSize: 14 }}>
              {altNames
                ? `Also known as ${altNames}`
                : ''}
            </Typography>
          }
        />
      )}
      {derivedIsFavouriteView && favData.id <= 50 && (
        <CardHeader title={favData.name} sx={{ color: red[900] }} />
      )}

      <CardMedia
        component='img'
        height='300'
        image={data.url}
        alt={`A photo of a/an ${name} cat`}
        sx={{flexGrow: 1}}
      />
      {!derivedIsFavouriteView && (
        <CardContent>
          <Typography variant='body2' sx={{ color: 'text.secondary', pb: 1 }}>
            {breed?.description || 'No description available.'}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {`The ${name} is known for ${temperamentString}`}
          </Typography>
          <Link sx={{color: deepPurple[800], fontSize: 14}} href={url} underline="hover" target="_blank" rel="noopener">Learn more
</Link>
        </CardContent>
      )}
      {derivedIsFavouriteView && (
        <CardContent>
          <Typography variant='body2' sx={{ color: 'text.secondary', pb: 1 }}>
            {`${favData.name} loves ${convertArrToString(favData.likes)}.`}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {`${favData.name} hisses at ${convertArrToString(
              favData.dislikes
            )}.`}
          </Typography>
        </CardContent>
      )}

      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<FavoriteIcon sx={{ color: red[900] }} />}
            checked={!!favourite}
            onChange={handleToggleFavourites}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function convertTempramentToListWithAnd(str) {
  const lastCommaIdx = str.lastIndexOf(',');
  if (lastCommaIdx === -1) {
    return str;
  } else {
    // string up to comma:
    const preCommaAndComma = str.substring(0, lastCommaIdx + 1);
    const postComma = str.substring(lastCommaIdx + 1);
    return preCommaAndComma + ' and ' + postComma;
  }
}
function convertArrToString(arr) {
  if (arr.length < 2) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr.join(' and ');
  } else {
    const strFromArr = arr.join(', ');
    return convertTempramentToListWithAnd(strFromArr);
  }
}
