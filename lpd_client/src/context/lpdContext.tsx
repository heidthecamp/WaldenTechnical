/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from 'react'
import { LPD } from '../types/LPD';

interface lpdContextProps {
  lpd: LPD | undefined;
  updateLPD: (value: LPD | undefined) => void;

  reason: string | undefined;
  updateReason: (newReason: string | undefined) => void;

  clearAll: () => void;
}

export const lpdContext = createContext<lpdContextProps>({
  lpd: undefined,
  updateLPD: (_value) => {},
  reason: undefined,
  updateReason: (_newReason) => {},
  clearAll: () => {}
})

interface lpdContextProviderProps extends React.PropsWithChildren {}

export default function LPDContextProvider(props: lpdContextProviderProps) {
  const {children} = props;

  const [lpd, setLPD] = useState<LPD | undefined>();
  const [reason, setReason] = useState<string>();

  const updateLPD = (value: LPD | undefined) => {
    setLPD(value);
  }
  const updateReason = (newReason: string | undefined) => {
    setReason(newReason);
  }

  const clearAll = () => {
    setLPD(undefined);
    setReason(undefined);
  }

  return (
    <lpdContext.Provider 
      value={{lpd, updateLPD, reason, updateReason, clearAll}}
    >
      {children}
    </lpdContext.Provider>
  )
}