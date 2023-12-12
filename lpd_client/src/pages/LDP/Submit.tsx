import { Box, Button, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { userContext } from '../../context/userContext'
import { lpdContext } from '../../context/lpdContext';
import { productContext } from '../../context/productContext';
import { UseValidLDP } from '../../hooks/UseValidLdp';
import { UseValidProduct } from '../../hooks/UseValidProduct';
import { putNewLDPEntry } from '../../services/ldpService';

export default function Submit() {
  const user = useContext(userContext);
  const ldp = useContext(lpdContext);
  const product = useContext(productContext);

  const validLdp = UseValidLDP();
  const validProduct = UseValidProduct()

  const handleSubmit = () => {
    putNewLDPEntry(
      product.productCode as string,
      product.lot as string,
      product.originProcessor as string,
      product.weight as string,
      ldp.lpd as string,
      ldp.reason as string,
      user.user.userName as string,
      user.user.location as string
    )
    ldp.clearAll();
    product.clearAll();
  }

  return (
    <Box sx={{ margin: 2}}>
      <Grid container display={'flex'} justifyContent={'end'} sx={{ p:2}}>
        <Grid item>
          <Button
            disabled={!validLdp || !validProduct}
            variant='contained'
            color='primary'
            size='large'
            onClick={handleSubmit}
          >Submit</Button>
        </Grid>
      </Grid>
    </Box>
  )
}
