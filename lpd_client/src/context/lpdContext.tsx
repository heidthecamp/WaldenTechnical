/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from 'react'

interface lpdContextProps {
  lpd: 'Loss' | 'Process' | 'Donate' | undefined;
  updateLPD: (value: 'Loss' | 'Process' | 'Donate' | undefined) => void;

  reason: string | undefined;
  updateReason: (newReason: string | undefined) => void;

  clearAll: () => void;
}

export const lpdContext = createContext<lpdContextProps>({
  lpd: 'Loss',
  updateLPD: (_value) => {},
  reason: '',
  updateReason: (_newReason) => {},
  clearAll: () => {}
})

interface lpdContextProviderProps extends React.PropsWithChildren {}

export default function LPDContextProvider(props: lpdContextProviderProps) {
  const {children} = props;

  const [lpd, setLPD] = useState<'Loss' | 'Process' | 'Donate' | undefined>();
  const [reason, setReason] = useState<string>();

  const updateLPD = (value: 'Loss' | 'Process' | 'Donate' | undefined) => {
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