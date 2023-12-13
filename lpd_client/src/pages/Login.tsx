import { Box, Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react'

import locations from '../assets/locations.json'
import Header from '../components/Header';
import { userContext } from '../context/userContext';

export default function Login() {

    const user = useContext(userContext);

    const [loginName, setLoginName] = useState('');
    const [loginLocation, setLoginLocation] = useState('');


    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault;
        setLoginName(e.target.value);
    }

    const updateLocation = (e: SelectChangeEvent) => {
        e.preventDefault;
        setLoginLocation(e.target.value);
    }

    const handleSubmit = () => {
        user.updateUserInfo(loginName, loginLocation)
    }

    return (
        <Box component="main" sx={{ width:'100%', margin: "auto"}}>
            <Header />
            <Card sx={{  width:'100%', m:'auto', alignContent:'center', alignItems:'center' }}>
                <CardHeader title="Login" />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item alignContent='center'>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <TextField onChange={updateName} id="name" label="name" variant='outlined' />
                            </FormControl>
                        </Grid>
                        <Grid item alignContent='center'>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id='location-selector-label'>Location</InputLabel>
                            <Select
                                labelId='location-selector-label'
                                id='location-selector'
                                label='location'
                                value={loginLocation}
                                onChange={updateLocation}
                                
                                >
                                {
                                    locations.map(loc => (
                                        <MenuItem value={loc.id} key={loc.address}>{loc.address}</MenuItem>
                                        ))
                                    }
                            </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item alignContent='center'>
                            <FormControl sx={{ m: 1, minWidth: 200}}>
                                <Button variant="contained" color='primary' onClick={handleSubmit}>
                                    Signin
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}
