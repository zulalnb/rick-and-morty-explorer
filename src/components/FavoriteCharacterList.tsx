"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { CharacterItem } from "./CharacterItem";
import { useAppSelector } from "@/lib/hooks";

export function FavoriteCharacterList() {
  const favorites = useAppSelector((state) => state.favorites);

  if (favorites.length < 1) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <FavoriteBorder sx={{ fontSize: 72, color: "text.secondary" }} />

        <Typography variant="h4" fontWeight="bold">
          No favorites yet
        </Typography>

        <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
          Characters can be added to favorites from their location pages.
        </Typography>

        <Button
          component={Link}
          href="/"
          variant="outlined"
          size="large"
          sx={{ mt: 2 }}
        >
          Explore locations
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 4, sm: 8 }}>
      {favorites.map((character) => (
        <Grid
          key={character.id}
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <Link href={`/characters/${character.id}`}>
            <CharacterItem character={character} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
