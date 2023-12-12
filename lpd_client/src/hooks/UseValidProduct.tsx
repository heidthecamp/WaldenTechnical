import { useEffect, useState, useContext } from "react";
import { productContext } from "../context/productContext";

const numericRegex = new RegExp(/^(?=.*[0-9])[0-9]+$/);

export function UseValidProduct() {
  
  const [isValid, setIsValid] = useState(false);
  const [validProductCode, setValidProductCode] = useState(false);
  const [validLot, setValidLot] = useState(false);
  const [validOriginProcessor, setValidOriginProcessor] = useState(false);
  const [validWeight, setValidWeight] = useState(false);

  const {productCode, lot, originProcessor, weight} = useContext(productContext)
  
  useEffect(() => {
    if(!!productCode && productCode.length === 5 && numericRegex.test(productCode)) {
      setIsValid(true);
    } else {
      setIsValid(false)
    }

  }, [setValidProductCode, productCode])
  useEffect(() => {
    if(!!lot && lot.length === 5 && numericRegex.test(lot)) {
      setIsValid(true);
    } else {
      setIsValid(false)
    }

  }, [setValidLot, lot])
  useEffect(() => {
    if(!!originProcessor && originProcessor.length === 2 && numericRegex.test(originProcessor)) {
      setIsValid(true);
    } else {
      setIsValid(false)
    }

  }, [setValidOriginProcessor, originProcessor])
  useEffect(() => {
    if(!!weight && weight.length === 4 && numericRegex.test(weight)) {
      setIsValid(true);
    } else {
      setIsValid(false)
    }

  }, [setValidWeight, weight])
 
  useEffect(() => {
    setIsValid(validProductCode && validLot && validOriginProcessor && validWeight)

  }, [validProductCode, validLot, validOriginProcessor, validWeight, setIsValid])

  return (isValid);
}