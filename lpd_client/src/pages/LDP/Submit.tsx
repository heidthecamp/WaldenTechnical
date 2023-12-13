import { Box, Button, Grid, Snackbar } from '@mui/material'
import React, { useContext, useState } from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { userContext } from '../../context/userContext'
import { lpdContext } from '../../context/lpdContext';
import { productContext } from '../../context/productContext';
import { UseValidLDP } from '../../hooks/UseValidLdp';
import { UseValidProduct } from '../../hooks/UseValidProduct';
import { putNewLDPEntry } from '../../services/ldpService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Submit() {

  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useContext(userContext);
  const ldp = useContext(lpdContext);
  const product = useContext(productContext);

  const validLdp = UseValidLDP();
  const validProduct = UseValidProduct()

  const handleError = () => {
    setErrorOpen(true);
  }

  const closeError = () => {
    setErrorOpen(false);
  }

  const handleSubmit = async () => {
    setLoading(true);
    const didSubmit = await putNewLDPEntry(
      product.productCode as string,
      product.lot as string,
      product.originProcessor as string,
      product.weight as string,
      ldp.lpd as string,
      ldp.reason as string,
      user.user.userName as string,
      user.user.location as string
    )
    if (didSubmit){
      setLoading(false);
      ldp.clearAll();
      product.clearAll();
      window.location.reload();
    }
    else {
      handleError();
      setLoading(false);
      console.error("did not submit propperly")
    }
  }

  return (
    <Box sx={{ margin: 2}}>
      <Snackbar open={errorOpen} autoHideDuration={7000} onClose={closeError}>
        <Alert onClose={closeError} severity='error' sx={{ width: '100%'}}>
          Was not able to submit LDP.
        </Alert>
      </Snackbar>
      <Grid container display={'flex'} justifyContent={'end'} sx={{ p:2}}>
        <Grid item>
          <Button
            disabled={!!(!validLdp || !validProduct || loading)}
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
