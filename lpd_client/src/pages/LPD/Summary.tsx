import { Box, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { lpdContext } from '../../context/lpdContext'
import { LPD } from '../../types/LPD'

const lpd = [
  'Loss', 'Process', 'Donate'
]

export default function Summary() {

  const {lpd: cLPD, updateLPD, updateReason, reason: cReason} = useContext(lpdContext)

  const setLPD = (e: SelectChangeEvent) => {
    const {value: v} = e.target;
    const value = v as LPD | undefined

    updateLPD(value);
  }

  const setReason = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    updateReason(value);
  }


  return (
    <Box sx={{ margin: 2, p:"2"}}>
      <Grid container direction={'row'} display='block' spacing={2}>
        <Grid item>
          <InputLabel id='lpd-selector-label'>LPD</InputLabel>
          <Select   
            labelId='lpd-selector-label'
            id="lpd-selector"
            onChange={setLPD}
            value={cLPD || ''}
            sx={{ minWidth:200}}
          >
            {
              lpd.map(item => (
                <MenuItem value={item} key={item}>{item}</MenuItem>
              ))
            }
          </Select>
        </Grid>
        <Grid item>
          <TextField
            helperText='Reason For LPD'
            onChange={setReason}
            fullWidth
            value={cReason}
            placeholder='Why this is going to Loss, Donate, or Process'
          />
        </Grid>
      </Grid>
      
    </Box>
  )
}
