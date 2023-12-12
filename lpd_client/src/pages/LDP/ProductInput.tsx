import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { ItemSelection } from '../../assets/ProductOtions';
import _productList from "../../assets/products.json" // cast as array of ItemSelections
import _locations from '../../assets/locations.json'
import { location } from '../../types/location';
import { dateToJulian } from '../../utils/julian';
import { productContext } from '../../context/productContext';
import { getIndexPairFromCode } from '../../utils/product';

const productList = _productList as ItemSelection[];
const locations = _locations as location[];

// Scanner input
  // five digit Product code:  12345
  // five digit lot code: 23345
    // two digit year: 23
    // three digit julian date: 345
  // two digit processor identifier: 12
  // four digit weight(x 100) 12.34 lbs = 1234


// capture prduct, lot, processing plant, weight
export default function ProductInput() {

  const product = useContext(productContext);

  const numericRegex = new RegExp(/^(?=.*[0-9])[0-9]+$/);
  
  const [scanner, setScanner] = useState<string | undefined>();

  const [meat, setMeat] = useState<number>();
  const [cut, setCut] = useState<number>();

  useEffect(() => {
    if (!scanner && meat !== undefined && cut !== undefined){
      const code:string = productList[meat].cuts[cut].code;
      product.updateProductCode(code);
    } else if (!scanner) {
      product.updateProductCode(undefined);
    }
  }, [cut, meat, product, scanner])
  

  const handleScarnner = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target

    setScanner(value)

    const pair = getIndexPairFromCode(value.slice(0, 5))

    if(pair !== undefined) {
      setMeat(pair[0]);
      setCut(pair[1]);
      
    }

    product.updateProductCode(value.slice(0, 5));
    product.updateLot(value.slice(5, 10));
    product.updateOriginProcessor(value.slice(10, 12));
    product.updateWeight(value.slice(12, 16));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const {id, value} = e.target

    if (id ==='weight') {
      product.updateWeight(value);
    }
  }

  const handleSelect = (e: SelectChangeEvent) => {
    e.preventDefault();
    
    const { name, value } = e.target;

    switch(name) {
      case  'meat-selector': {
        setCut(undefined);
        setMeat(+value);
        break;
      }
      case 'cut-selector': {
        setCut(+value);
        break;
      }
      case 'location-selector': {
        product.updateOriginProcessor(value);
        break;
      }
    }
  }

  const handleDateChange = (date: Date) => {
    const julian = dateToJulian(date);

    product.updateLot(julian);
  }

  const clear = () => {
    setScanner(undefined);
    setMeat(undefined);
    setCut(undefined);
    product.clearAll();
  }

  return (
    <productContext.Consumer >
      {({}) => {
      return (
    <Box sx={{ margin: 2 }}>
      <Grid container display={'flex'} justifyContent={'space-between'}>
        <Grid item>
          <FormControl>
            <TextField 
              error={!!(scanner && (!numericRegex.test(scanner) || !(scanner.length === 0 || scanner.length === 16)))}
              focused
              value={scanner || ''} 
              label='scanner input' 
              type='text' 
              onChange={handleScarnner}
              sx= {{
                  marginTop: 2
              }}
              inputProps={{ maxLength: 16}}
            />
          </FormControl>
        </Grid>
        <Grid item>
            <Button variant='contained' color='error' size='large' sx={{ margin: 3 }} onClick={clear} >Clear</Button>
        </Grid>
      </Grid>

      <Divider />

      <Grid container display='flex' direction='row' spacing={3} sx={{ marginTop: .5}} >
        <Grid item sx={{ marginTop: '-8px' }}>
          {/* Use the index for Meat and Cut because we will need to calculate the product code */}
          <InputLabel id="meat-selector-label">Meat</InputLabel>
          <Select
            labelId="meat-selector-label"
            id="meat-selector"
            name='meat-selector'
            onChange={handleSelect}
            sx={{ minWidth:'200px'}}
            disabled={!!scanner}
            value={meat?.toString() || ''}
          >
          {
            productList.map((product, i) => (
              <MenuItem
                value={i}
                key={product.type}
              >
                {product.type}
              </MenuItem>
            ))
          }
          </Select>
        </Grid>
        <Grid item sx={{ marginTop: '-8px' }}>
          <InputLabel id="cut-selector-label">Cut</InputLabel>
          <Select
            labelId="cut-selector-label"
            id="cut-selector"
            name='cut-selector'
            onChange={handleSelect}
            disabled={meat === undefined || !!scanner}
            sx={{ minWidth:'200px'}}
            value={cut?.toString() || ''}
          >
          {
            meat !== undefined && productList[meat].cuts.map((cut, i) => (
              <MenuItem
                value={i}
                key={cut.cut}
              >
                {cut.cut}
              </MenuItem>
            ))
          }
          </Select>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="cut-selector-label" sx={{ margin: -3, paddingLeft: 1}}>Lot</InputLabel>
            <DesktopDatePicker
              onChange={(newValue) => {handleDateChange(newValue as Date)}} 
              sx={{ marginTop: 2}}
              disabled={!!scanner}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ marginTop: '-8px' }}>
          <InputLabel id='location-selector-label'>Origin Location</InputLabel>
          <Select
            id='location-selector'
            labelId='location-selector-label'
            value={product.originProcessor || ''}
            disabled={!!scanner}
            name='location-selector'
            onChange={handleSelect}
            sx={{ minWidth: 200 }}
          >
            {
              locations.map((location) => (
                <MenuItem
                  value={location.id}
                  key={location.address}
                >
                  {location.address}
                </MenuItem>
              ))
            }
          </Select>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor='weight' shrink>Weight in lbs x 100</InputLabel>
            <OutlinedInput
              error={!!(product.weight && !numericRegex.test(product.weight))}
              value={product.weight || ''}
              id='weight'
              type='text'
              placeholder='weight'
              onChange={handleChange}
              inputProps={{ maxLength: 4}}
              sx= {{
                margin: 2
              }}
              fullWidth
              aria-label='Weight in lbs x 100'
              disabled={!!scanner}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
      )}}
    </productContext.Consumer>
  )
}