import './App.css';
import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import AuthenticatedPages from './components/AuthenticatedPages.js'
import HoldingPage from './components/HoldingPage.js'

export default App

// App only renders components from ./components

function App() {

  // authenticationStatus state shows if user has logged in and has a valid session cookie. 
  // The state is determined by a fetch call from frontend application
  // rerenderCount state used to show how many times app has rerendered after checking authentication
  // The state is used to prevent extra fetch calls.

  const [authenticationStatus, setAuthenticationStatus] = useState("Authenticating");
  const [rerenderCount, setRerenderCount] = useState(0);

  // After App has initially rendered HoldingPage, 
  // useEffect() will be called and the arrow function inside is responsible for
  // fetching to the backend which will change authenticatingStatus state.
  // After the state changes, App will rerender, causing either 
  // LoginPage to be render or AuthenticatedPages to be rendered.
  // This is because App uses conditions that are based on authenticatingStatus to return a component.
  // rerenderCount will be incremented to prevent extra fetches to the backend after App has rerendered.
  
  useEffect(() => {

    // Wrapping the fetch function with a condition based on rerenderCount state
    // will prevent fetch from being called again after App has rerender.

    if (rerenderCount < 1) {
      fetch("api/verifyauthenticated/")
      .then(response => {

        // Based on which boolean is returned, authenticationStatus state will change accordingly.
        // rerenderCount state will increment regardless of which boolean is returned.

        if (response.status == 200) {

          return true

        } else {

          return false

        }

      }).then( boolean => {

        if (boolean == true) {

          setRerenderCount(rerenderCount + 1);
          setAuthenticationStatus("Authenticated");

        } else {

          setRerenderCount(rerenderCount + 1);
          setAuthenticationStatus("Unauthenticated");

        }
     
      })
    } 

  })

  // App will render the first condition first
  // Depending on the authenticationStatus that will change after rendering, 
  // app will render either AuthenticatedPages or LoginPage

  if (authenticationStatus == "Authenticating") {

    return <HoldingPage />

  } else if (authenticationStatus == "Authenticated") {
    
    return <AuthenticatedPages />

  } else if (authenticationStatus == "Unauthenticated") {

    return <LoginPage />

  }

}
