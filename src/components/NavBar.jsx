import { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { deepPurple, red } from '@mui/material/colors';

const RedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[900],
    '&:hover': {
      backgroundColor: alpha(red[900], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[900],
  },
}));

export default function NavBar({onViewChange}) {
  const [showFavourites, setShowFavourites] = useState(false);

  function handleSwitchChange(e) {
    setShowFavourites(e.target.checked);
    onViewChange(e.target.checked);
  }
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar sx={{ background: deepPurple[800] }} position='sticky'>
        <Toolbar sx={{
              display: 'flex',
              flexDirection:'column',
              justifyContent: 'center',
              p: 4,
            }}>
            <FormGroup sx={{display: 'flex', width: 300, alignSelf: 'flex-end'}}>
            <FormControlLabel
              control={<RedSwitch onChange={handleSwitchChange} size='small' />}
              label={`Show ${
                showFavourites ? 'available ShuggaPusses' : 'your ShuggaPusses'
              }`}
            />
          </FormGroup>
          <Typography
            variant='h1'
            sx={{
              flexGrow: 1,
              display: 'flex',
              fontSize: 48,
              justifyContent: 'center',
              pb: 2,
              pt: 1
            }}
          >
            Meowr: Hiss or pspsps to find your next ShuggaPuss
          </Typography>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}
