import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

export default Home

function Home() {
  return (
    <LogoutButton />   
  )
}

function LogoutButton() {

  // handleSubmit fetches a POST request to logout API and reloads page
  // so user is redirected to login page upon authentication failure by <App />

  function handleSubmit(event) {

    // Arguments for fetching to lgoout API

    const url = "/api/logout/" 
    const csrftoken = Cookies.get("csrftoken") // Backend provides the csrftoken in a cookie 

    // Prevents browser from refreshing page on submit and fetches to logout API

    event.preventDefault()
    fetch(
      url,
      { 
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }
    )
    .then(
      () => window.location.reload()
    )

  }

  return (
    <form onSubmit={handleSubmit} >
      <Button type="submit" >Logout</Button>
    </form>
  )
}
