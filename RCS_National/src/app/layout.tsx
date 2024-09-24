import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./store/storeProvider";
import ThemeLayout from "./themes/ThemeLayout";
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
          <StoreProvider>
            <ThemeLayout>{children}</ThemeLayout>
          </StoreProvider>
        </body>
      </html>
    );
  }