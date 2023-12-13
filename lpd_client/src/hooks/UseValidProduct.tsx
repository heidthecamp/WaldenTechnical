import { useEffect, useState, useContext } from "react";
import { productContext } from "../context/productContext";

const numericRegex = new RegExp(/^(?=.*[0-9])[0-9]+$/);

export function UseValidProduct() {
  const [validProductCode, setValidProductCode] = useState(false);
  const [validLot, setValidLot] = useState(false);
  const [validOriginProcessor, setValidOriginProcessor] = useState(false);
  const [validWeight, setValidWeight] = useState(false);

  const {productCode, lot, originProcessor, weight} = useContext(productContext)
  
  useEffect(() => {
    if(!!productCode && productCode.length === 5 && numericRegex.test(productCode)) {
      setValidProductCode(true);
    } else {
      setValidProductCode(false)
    }

  }, [setValidProductCode, productCode])
  useEffect(() => {
    if(!!lot && lot.length === 5 && numericRegex.test(lot)) {
      setValidLot(true);
    } else {
      setValidLot(false)
    }

  }, [setValidLot, lot])
  useEffect(() => {
    if(!!originProcessor && originProcessor.length === 2 && numericRegex.test(originProcessor)) {
      setValidOriginProcessor(true);
    } else {
      setValidOriginProcessor(false)
    }

  }, [setValidOriginProcessor, originProcessor])
  useEffect(() => {
    if(!!weight && weight.length === 4 && numericRegex.test(weight)) {
      setValidWeight(true);
    } else {
      setValidWeight(false)
    }

  }, [setValidWeight, weight])
 
  return (validProductCode && validLot && validOriginProcessor && validWeight);
}