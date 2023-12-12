import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { userContext } from '../context/userContext';

export default function Header() {

  const user = useContext(userContext);


  const displaySignout = (user.user.userName && user.user.location)

  const handleSignout = () => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (displaySignout) {
      user.updateUserInfo(null, null);
    }
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{flexGrow: 1}} >
          Loss, Process, Donate
        </Typography>
        {
          displaySignout && <Button color='inherit' onClick={handleSignout}>Sign Out</Button>
        }
      </Toolbar>
    </AppBar>
  )
}
