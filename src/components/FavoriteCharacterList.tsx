"use client";

import Grid from "@mui/material/Grid";
import { CharacterItem } from "./CharacterItem";
import { useAppSelector } from "@/lib/hooks";

export function FavoriteCharacterList() {
  const favorites = useAppSelector((state) => state.favorites);
  if (favorites.length > 0) {
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
            <CharacterItem character={character} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
