import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

export default LoginPage

function LoginPage() {

  return (
    <LoginForm />
  )

}
  
function LoginForm() {

  /* handleSubmit is responsible for fetching to login API using form data 
  and preventing event default upon clicking submit button */

  function handleSubmit(event) {

    // Arguments for fetching to login API

    const url = "/api/login/" 
    const data = {}
    const csrftoken = Cookies.get("csrftoken") // Backend provides the csrftoken in a cookie 

    /* Loops through user-submitted form to retrieve only input names and values 
    and puts them into data object */

    for (let i=0; i<event.target.length; i++) {                                
      if (event.target[i].nodeName == "INPUT") {
        data[event.target[i].name] = event.target[i].value;   
      }  
    }
     
    // Prevents browser from executing default on submit and fetches to login API

    event.preventDefault()
    fetch(
      url,
      {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": csrftoken,
        },
        body: new URLSearchParams(data), // Backend accepts only the above content-type
      }
    ).then(
      () => window.location.reload()
    )
    
  }

  return (
    <form onSubmit={handleSubmit} >
      <br></br>
      <TextField  
        required={true} 
        label="Username" 
        name="username" 
      />
      <br></br>
      <br></br>
      <TextField 
        required={true} 
        label="Password" 
        name="password" 
        type="password" 
      />
      <br></br>
      <br></br>
      <Button type="submit" >
        Login
      </Button>
    </form>
  )
  
}