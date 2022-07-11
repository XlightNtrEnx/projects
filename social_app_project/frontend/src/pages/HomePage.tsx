import LogoutButton from "../components/LogoutButton";

export default HomePage;

// Part of the app that allows the user to navigate to any other part of the app except the LoginPage.

function HomePage(props: any) {
  
  return (

    // Logs the user out in backend and triggers App's verification effect so a reverification can happen and navigate user to LoginPage

    <LogoutButton />   

  );

};

