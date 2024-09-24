"use client";

import Grid from "@mui/material/Grid2";
import { CharacterItem } from "./CharacterItem";
import { Character } from "@/types/character";

export const CharacterList = ({
  characters,
}: {
  characters: readonly Character[];
}) => {
  return (
    <Grid container spacing={{ xs: 6, md: 8 }}>
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </Grid>
  );
};
