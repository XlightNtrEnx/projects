import './App.css';
import HoldingPage from './pages/HoldingPage'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "./store/store"
import { setAuthenticated, setUnauthenticated } from './slices/authenticationStatusSlice';
import {
  useNavigate,
  Outlet
} from "react-router-dom";
import { useLocation } from 'react-router-dom';

/* 
App main job is to render an Outlet which renders all the other child Routes.

App also provides a verification effect that verifies if user is authenticated
by communicating with the backend. The verification effect will cause the browser to navigate to LoginPage if not authenticated.
Otherwise, the user will be navigated to HomePage. The effect also sets the redux state authenticationStatus accordingly.
The effect can be trigger by any component within the App by toggling the redux state verifyAuthenticationEffectDependency. 

App can render other components that wrap around Outlet.
*/

export default function App(): JSX.Element | null {

  // Redux states and dispatch function.

  const authenticationStatus = useSelector(state => state.authenticationStatus.value);
  const verifyAuthenticationEffectDependency = useSelector(state => state.verifyAuthenticationEffectDependency.value);
  const dispatch = useDispatch();

  // Function for browser to navigate to different URL.

  const navigate = useNavigate();

  // Tells which child route is being rendered.

  const location = useLocation();

  // Verification effect that is called on initial render of App or when its dependency gets changed. 

  useEffect(() => {

    fetch("api/accounts/verifyauthenticated/")
    .then(response => {

      // Based on which boolean is returned, authenticationStatus state will change and browser will navigate accordingly. 

      if (response.status == 200) {

        return true;

      } else {
        
        console.log(location)
        return false;

      }

    })
    .then( boolean => {

      if (boolean == true) {

        dispatch(setAuthenticated());
        navigate("");

      } else {

        dispatch(setUnauthenticated());
        navigate("/login");

      }
    
    });

    }, [verifyAuthenticationEffectDependency] // Dependency is a boolean that is togglable.
  
  );

  /* Renders HoldingPage that has no Outlet first on initial render so that parts of the App 
  that require authentication won't be unnecessarily rendered by Outlet if user is unauthenticated. */

  switch (authenticationStatus) {

    case "Authenticated" :

      return (
        
        <Outlet />

      );       

    case "Unauthenticated" :

      return (
        
        <Outlet />

      );       

    default: 

      return (
        
        <HoldingPage />

      );

  }

};
