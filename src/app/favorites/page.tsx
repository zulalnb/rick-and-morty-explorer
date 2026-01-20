import { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { FavoriteCharacterList } from "@/components/FavoriteCharacterList";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "Discover and manage your favorite characters from the Rick and Morty universe. View character details, track their stories, and explore their adventures.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Favorites | Rick and Morty Explorer",
    description:
      "Discover and manage your favorite characters from the Rick and Morty universe. View character details, track their stories, and explore their adventures.",
    type: "website",
  },
};

export default async function Favorites() {
  return (
    <Container component="main" sx={{ marginY: 4 }}>
      <Typography variant="h1" sx={visuallyHidden}>
        Favorites
      </Typography>
      <FavoriteCharacterList />
    </Container>
  );
}
