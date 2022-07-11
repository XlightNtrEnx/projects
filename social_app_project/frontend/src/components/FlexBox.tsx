import { Box } from "@mui/system";

export default function FlexBox(props: any) {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.sx
      }}
    >
      {props.children}
    </Box>
  )
}