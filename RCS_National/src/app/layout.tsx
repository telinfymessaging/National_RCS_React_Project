'use client';
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  import type { Metadata } from "next";
  import { Inter } from "next/font/google";
  import "./globals.css";
  import Navbar from '../app/compoents/navbar/navbar';
  import Sidebar from '../app/compoents/sidebar/sidebar';
  import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
  import  googl_logo from "../../public/assets/image/googl-logo.png";
import { Provider } from "react-redux";
import { store } from "./store";


  const inter = Inter({ subsets: ["latin"] });

 

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="https://ovseb6.n3cdn1.secureserver.net/wp-content/uploads/2022/11/favicon.svg?time=1691515578"
            sizes="32x32"
          />
          <title>RCS_National</title>
          <meta
            name="description"
            content="This RCS Website, a messaging platform"
          />
        </head>
        <body className={inter.className} style={{ margin: "0" }}>
<<<<<<< Updated upstream
        <Provider store={store}>
=======
          <Provider store={store} >
>>>>>>> Stashed changes
          {/* <Sidebar/> */}

          {/* <Navbar /> */}
          {children}
          </Provider>
        </body>
      </html>
    );
  }
