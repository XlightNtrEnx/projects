import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Cookies from 'js-cookie';
import { useDispatch } from '../store/store'
import { toggle } from '../slices/verifyAuthenticationEffectDependencySlice';

export default function LoginForm(props: any) {

    // Redux dispatch.
  
    const dispatch = useDispatch();
  
    // Provides the functionality.
  
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
  
      // Arguments for fetch.
  
      const url = "/api/accounts/login/"; 
      const csrftoken = Cookies.get("csrftoken"); // Backend provides the csrftoken in a cookie.
      const body: Record<string, any> = {};
  
      // The 2 lines below insert user provided form data into the body parameter.
  
      const formData = new FormData(event.target as HTMLFormElement);
      formData.forEach((value: FormDataEntryValue, key: string) => {body[key] = value});
  
      // Responsible for handleSubmit's functionality.
  
      event.preventDefault();
      fetch(
        url,
        { 
          redirect: "follow",
          method: "POST",
          headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": csrftoken,
          },
          body: new URLSearchParams(body), 
        }
      ).then(
  
        response => {
  
          /* Backend responds with a 302 which can't be read by fetch().
          If the response that comes from the request made after the 302 response has a 200 status code which means
          that the user's network is working, App's verification effect will be triggered  */
  
          if (response.status == 200) {
  
            dispatch(toggle()); 
  
          }
  
        }
  
      );
  
    };
  
    return (
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
        }} 
      >
        <TextField  
          required={true} 
          label="Username" 
          name="username" 
          margin="normal"
        />
        <TextField 
          required={true} 
          label="Password" 
          name="password" 
          type="password"
          margin="normal" 
        />
        <Button type="submit" >
          Login
        </Button>
      </Box>
    )
  
  }