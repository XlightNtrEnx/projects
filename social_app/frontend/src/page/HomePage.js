import Button from '@mui/material/Button';

export default Home

function Home() {
  return (
    <LogoutButton />   
  )
}

function LogoutButton() {

  // handleSubmit fetches a GET request to logout API and reloads page
  // so user is redirected to login page upon authentication failure by <App />

  function handleSubmit(event) {

    event.preventDefault()
    fetch(
      "/api/logout/",
      { 
        method: "GET",
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
