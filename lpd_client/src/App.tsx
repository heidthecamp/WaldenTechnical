import UserContextProvider, { userContext } from "./context/userContext";
import LPDProcessing from "./pages/LDP/LPDProcessing";
import Login from "./pages/Login";

function App() {





  return (
    <>
      <UserContextProvider>
          <userContext.Consumer>
          {
            value => (
              value.user.userName && value.user.location ?
              <LPDProcessing /> :
              <Login  />
            )
          }
          </userContext.Consumer>
      </UserContextProvider>
    </>
  )
}

export default App
