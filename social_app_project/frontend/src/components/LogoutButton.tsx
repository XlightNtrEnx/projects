import { useDispatch } from '../store/store'
import Cookies from 'js-cookie';
import { toggle } from '../slices/verifyAuthenticationEffectDependencySlice';
import Button from '@mui/material/Button';

export default function LogoutButton(props: any) {

    // Dispatch function
  
    const dispatch = useDispatch();
  
    // Responsible for LogoutButton's functionality
  
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
  
      // Arguments for fetching to lgoout API
  
      const url = "/api/accounts/logout/"; 
      const csrftoken = Cookies.get("csrftoken"); // Backend provides the csrftoken in a cookie 
  
      // Responsible for handleSubmit's functionality
  
      event.preventDefault()
      fetch(
        url,
        { 
          redirect: "follow",
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      )
      .then(
  
        /* Backend responds with a 302 which can't be read by fetch().
        If the response that comes from the request made after the 302 response has a 200 status code which means
        that the user's network is working, App's verification effect will be triggered  */
  
        response => {
  
          if (response.status == 200) {
  
            dispatch(toggle()); // Toggles verifyAuthenticationEffectDependency so the effect is triggered
  
          }
  
        }
  
      );
  
    };
  
    return (
      <form onSubmit={handleSubmit} >
        <Button type="submit" >Logout</Button>
      </form>
    );
  };
  