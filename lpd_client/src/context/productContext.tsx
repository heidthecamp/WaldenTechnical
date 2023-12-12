/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react"

interface productContextProps {
  productCode: string | undefined;
  updateProductCode: (newProductCode: string | undefined) => void;

  lot: string | undefined;
  updateLot: (newLot: string | undefined) => void;

  originProcessor: string | undefined;
  updateOriginProcessor: (newProcessor: string | undefined) => void;

  weight: string | undefined;
  updateWeight: (newWeight: string | undefined) => void;

  clearAll: () => void;
}

export const productContext = createContext<productContextProps>({
  productCode: '',
  updateProductCode: (_newProductCode: string | undefined) => {},
  lot: '',
  updateLot: (_newLotCode: string | undefined) => {},
  originProcessor: '',
  updateOriginProcessor: (_newProcessor: string | undefined) => {},
  weight: '',
  updateWeight: (_newWeight: string | undefined) => {},
  clearAll: () => {}
})

interface ProductContextProviderProps extends React.PropsWithChildren {}

export default function ProductContextProvider(props: ProductContextProviderProps) {
  const {children} = props;

  const [productCode, setProductCode] = useState<string>();
  const [lot, setLot] = useState<string>();
  const [originProcessor, setOriginProcessor] = useState<string>();
  const [weight, setWeight] = useState<string>();

  const updateProductCode = (newProductCode: string | undefined) => {
    setProductCode(newProductCode);
  }

  const updateLot = (newLot: string | undefined) => {
    setLot(newLot);
  }

  const updateOriginProcessor = (newProcessor: string | undefined) => {
    setOriginProcessor(newProcessor);
  }

  const updateWeight = (newWeight: string | undefined) => {
    setWeight(newWeight);
  }


  const clearAll = () => {
    console.log(productCode);
    console.log(lot);
    console.log(originProcessor);
    console.log(weight);
    setProductCode(undefined);
    setLot(undefined);
    setOriginProcessor(undefined);
    setWeight(undefined);
  }

  return (
    <productContext.Provider value={{
      productCode, updateProductCode,
      lot, updateLot,
      originProcessor, updateOriginProcessor,
      weight, updateWeight,
      clearAll
    }}>
      {children}
    </productContext.Provider>
  )
}