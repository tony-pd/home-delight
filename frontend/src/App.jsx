import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthContext from "./context/cart/AuthContext";
const App = () => {
  const [authState, setAuthState] = useState({
    loggedIn: false,
    username: null
  })

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <AppRoutes />
      </AuthContext.Provider>
    </>
  )
}

export default App;
