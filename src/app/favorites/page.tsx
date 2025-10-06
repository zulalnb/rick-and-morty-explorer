import { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FavoriteCharacterList } from "@/components/FavoriteCharacterList";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "Discover and manage your favorite characters from the Rick and Morty universe. View character details, track their stories, and explore their adventures.",
  openGraph: {
    title: "Favorites | Rick and Morty Explorer",
    description:
      "Discover and manage your favorite characters from the Rick and Morty universe. View character details, track their stories, and explore their adventures.",
    type: "website",
  },
};

export default async function Page() {
  return (
    <main>
      <Container sx={{ marginY: 4 }}>
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            width: "1px",
            height: "1px",
            p: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        >
          Favorites
        </Typography>
        <FavoriteCharacterList />
      </Container>
    </main>
  );
}
