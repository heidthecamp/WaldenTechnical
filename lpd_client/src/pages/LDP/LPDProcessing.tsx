import {  Box, Divider, Paper, } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import ProductInput from './ProductInput'
import Summary from './Summary'


export default function LPDProcessing() {

  return (
    <Box sx={{ margin: 2, flexGrow: 1, width: "100%"}} component='main'>
      <Header  />
      <div style={{ width: '100%'}}>
      <Box component='view' sx={{ margin:'auto', alignContent:'center'}} >
        <Paper>
          <ProductInput />
          <Divider sx={{ margin: 2}} />
          <Summary />
        </Paper>
      </Box>
      </div>
    </Box>
  )
}
