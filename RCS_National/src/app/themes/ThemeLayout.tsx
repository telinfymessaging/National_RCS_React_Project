'use client';
import { ThemeProvider } from "@emotion/react";
import theme from "./auth_theme";
export default function ThemeLayout({children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}