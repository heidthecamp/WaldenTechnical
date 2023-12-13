import { Box, Button, Grid, Snackbar } from '@mui/material'
import React, { useContext, useState } from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { userContext } from '../../context/userContext'
import { lpdContext } from '../../context/lpdContext';
import { productContext } from '../../context/productContext';
import { UseValidLPD } from '../../hooks/UseValidLpd';
import { UseValidProduct } from '../../hooks/UseValidProduct';
import { putNewLPDEntry } from '../../services/lpdService';

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
  const lpd = useContext(lpdContext);
  const product = useContext(productContext);

  const validlpd = UseValidLPD();
  const validProduct = UseValidProduct()

  const handleError = () => {
    setErrorOpen(true);
  }

  const closeError = () => {
    setErrorOpen(false);
  }

  const handleSubmit = async () => {
    setLoading(true);
    const didSubmit = await putNewLPDEntry(
      product.productCode as string,
      product.lot as string,
      product.originProcessor as string,
      product.weight as string,
      lpd.lpd as string,
      lpd.reason as string,
      user.user.userName as string,
      user.user.location as string
    )
    if (didSubmit){
      setLoading(false);
      lpd.clearAll();
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
          Was not able to submit lpd.
        </Alert>
      </Snackbar>
      <Grid container display={'flex'} justifyContent={'end'} sx={{ p:2}}>
        <Grid item>
          <Button
            disabled={!!(!validlpd || !validProduct || loading)}
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
