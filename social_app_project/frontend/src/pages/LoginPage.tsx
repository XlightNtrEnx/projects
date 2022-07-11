import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

/* Page that the user can login with. 
Form includes a button that can redirect to the create account page. */

export default function LoginPage(props: any) {

  return (

    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "absolute"
      }}
    >

      <LoginForm />

    </Box>

  );

};



