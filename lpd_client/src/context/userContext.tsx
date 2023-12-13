import { createContext, useEffect, useState } from "react"
import { userInfo } from "../user/user"

interface userContextProps {
  user: userInfo;
  updateUserInfo: (name: string | null, loc: string | null) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userContext = createContext<userContextProps>({user: {userName: null, location: null}, updateUserInfo: (_name: null | string, _loc: null | string) => {}})


interface UserContextProviderProps extends React.PropsWithChildren{

}

export default function UserContextProvider(props: UserContextProviderProps) {
  const {children} = props

  const [userName, setUserName] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(()=>{
    const localName = window.localStorage.getItem('userName');
    if(localName) {
      setUserName(localName);
    }
    const localLocation = window.localStorage.getItem('location');
    if(localLocation) {
      setLocation(localLocation);
    }
  }, [])

  const updateUserInfo = (name: string | null, loc: string | null) => {
    setUserName(name);
    setLocation(loc);
    if (name && loc){
      window.localStorage.setItem('userName', name);
      window.localStorage.setItem('location', loc);
    } else {
      window.localStorage.removeItem('userName');
      window.localStorage.removeItem('location');
    }
  
  }

  return (
    <userContext.Provider value={{user: {userName: userName, location: location}, updateUserInfo: updateUserInfo}}>
      {children}
    </userContext.Provider>
  )
}
