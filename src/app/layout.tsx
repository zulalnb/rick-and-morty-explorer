import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import StoreProvider from "./StoreProvider";
import theme from "@/theme";
import { Header } from "@/components/Header";
import { BASE_URL } from "@/lib/constants";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/a11y";

const NEXT_VERSION = process.env.NEXT_PUBLIC_NEXT_VERSION
  ? `Next.js ${process.env.NEXT_PUBLIC_NEXT_VERSION}`
  : "Next.js";
const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Rick and Morty Explorer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Discover Locations and Characters`,
  },
  description:
    "Explore the vast universe of Rick and Morty. Browse through locations, view detailed character profiles, and manage your favorites. Stay connected with your favorite characters from the multiverse!",
  generator: NEXT_VERSION,
  applicationName: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  keywords: [
    "Rick and Morty Explorer",
    "Rick and Morty",
    "Rick and Morty API",
    "Characters",
    "Locations",
    "Favorites",
    "Multiverse",
    "Universe",
  ],
  openGraph: {
    title: `${SITE_NAME} | Discover Locations and Characters`,
    description:
      "Explore the vast universe of Rick and Morty. Browse through locations, view detailed character profiles, and manage your favorites. Stay connected with your favorite characters from the multiverse!",
    type: "website",
    url: "/",
    locale: "en_US",
    siteName: SITE_NAME,
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
                  html: {
                    scrollBehavior: "smooth",
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    html: {
                      scrollBehavior: "auto",
                    },
                  },
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
        <Analytics />
      </body>
    </html>
  );
}
