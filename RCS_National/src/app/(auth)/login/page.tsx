import LoginForm from "./loginForm";
import { Box, Typography } from "@mui/material";
export default function LoginPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="49%"
    >
      <Box paddingLeft={"100px"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          width={"420px"}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            fontSize="40px"
            marginBottom={"100px"}
          >
            Login to Telinfy
          </Typography>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}




















