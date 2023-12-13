import { useEffect, useState, useContext } from "react";
import { lpdContext } from "../context/lpdContext";


export function UseValidLPD() {
  const [isValid, setIsValid] = useState(false);

  const { lpd, reason} = useContext(lpdContext)
  
  useEffect(() => {
    if(lpd !== undefined && ( !!reason && reason.length >= 5 )) {
      setIsValid(true);
    } else {
      setIsValid(false)
    }

  }, [setIsValid, lpd, reason])
 
  return (isValid);
}