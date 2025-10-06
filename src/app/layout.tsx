import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import StoreProvider from "./StoreProvider";
// import "./globals.css";
import theme from "@/theme";
import { Header } from "@/components/Header";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rick and Morty Explorer",
    default: "Rick and Morty Explorer | Discover Locations and Characters",
  },
  description:
    "Explore the vast universe of Rick and Morty. Browse through locations, view detailed character profiles, and manage your favorites. Stay connected with your favorite characters from the multiverse!",
  openGraph: {
    title: "Rick and Morty Explorer | Discover Locations and Characters",
    description:
      "Explore the vast universe of Rick and Morty. Browse through locations, view detailed character profiles, and manage your favorites. Stay connected with your favorite characters from the multiverse!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <StoreProvider>
              <CssBaseline />
              <GlobalStyles
                styles={{
                  a: {
                    textDecoration: "inherit",
                    color: "inherit",
                  },
                  ul: {
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                  },
                }}
              />
              <Header />
              {children}
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
