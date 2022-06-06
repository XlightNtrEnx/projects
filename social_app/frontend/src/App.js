import logo from './logo.svg';
import './App.css';
import Home from './page/HomePage.js';
import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './page/LoginPage';

export default App

function App() {

  const [authenticationStatus, setAuthenticationStatus] = useState("Authenticating");
  const [redirectCount, setRedirectCount] = useState(0);

  // After app has rendered with Authenticating page, browser will fetch to api/verifyauthenticated with get request using below useEffect()
  // if status = 200, set authenticationstatus to authenticated which will trigger authenticated page to render
  // else, set authenticationstatus to unauthenticated which will trigger login page to render
  // redirectCount will also be incremented to ensure no extra rerenders.
  
  useEffect(() => {

    // Condition prevents extra rerenders

    if (redirectCount < 1) {
      fetch("api/verifyauthenticated/")
      .then(response => {

        if (response.status == 200) {

          return true

        } else {

          return false

        }

      }).then( result => {

        if (result == true) {

          setRedirectCount(redirectCount + 1);
          setAuthenticationStatus("Authenticated");

        } else {

          setRedirectCount(redirectCount + 1);
          setAuthenticationStatus("Unauthenticated");

        }
     
      })
    } 

  })

  // App will load the the first condition first
  // Depending on the result of above function that runs after loading, app will load either the second or third condition

  if (authenticationStatus == "Authenticating") {

    return <div>Authenticating!</div>

  } else if (authenticationStatus == "Authenticated") {
    
    return <AuthenticatedApp />

  } else if (authenticationStatus == "Unauthenticated") {

    return <LoginPage />

  }

}

function AuthenticatedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route/>
      </Routes>
    </BrowserRouter>
  );
}
