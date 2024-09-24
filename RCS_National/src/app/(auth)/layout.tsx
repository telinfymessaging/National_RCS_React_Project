import { Box} from "@mui/material";
import Isolation_Mode from "../../../public/assets/image/Isolation_Mode.png";
import Image from "next/image";
import Auth_Layout from "./sections/auth_Layout";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: "0" }}>
        <Box
          display="flex"
          flex="1 1 auto"
          flexDirection={{ xs: "column", md: "row" }}
          height="100vh"
          bgcolor="#F9F9F9"
        >
          <Image
            src={Isolation_Mode}
            alt="Isolation_Mode"
            style={{
              width: "315px",
              height: "auto",
              marginBottom: "20px",
              zIndex: 2,
              position: "absolute",
              top: 0,
              right: 0,
              overflow: "clip"
            }}
          />
            <Auth_Layout />
            {children}
        </Box>
      </body>
    </html>
  );
}






