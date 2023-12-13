import {  Box, Divider, Paper, } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import ProductInput from './ProductInput'
import Summary from './Summary'
import ProductContextProvider from '../../context/productContext'
import LPDContextProvider from '../../context/lpdContext'
import Submit from './Submit'

export default function LPDProcessing() {

  return (
    <Box sx={{ margin: 2, flexGrow: 1, width: "100%", paddingLeft: '20px', marginRight: '20px'}} component='main'>
      <Header  />
      <Box component='view' sx={{ width: '90%', margin:'20px', p: 5, alignContent:'center'}} >
        <Paper>
          <ProductContextProvider>
            <LPDContextProvider>
            <ProductInput />
            <Divider sx={{ margin: 2}} />
            <Summary />
            <Submit />
            </LPDContextProvider>
          </ProductContextProvider>
      
        </Paper>
      </Box>
    </Box>
  )
}
