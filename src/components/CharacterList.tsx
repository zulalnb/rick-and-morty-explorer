"use client";

import { Theme } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { CharacterItem } from "./CharacterItem";
import { Character } from "@/types/character";

export const CharacterList = ({
  characters,
}: {
  characters: readonly Character[];
}) => {
  return (
    <Container
      sx={(theme: Theme) => ({
        [theme.breakpoints.down("sm")]: {
          paddingX: 0,
        },
      })}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 8 }}
        flexWrap={{ xs: "nowrap", md: "wrap" }}
        px={{ xs: 2, md: 0 }}
        sx={{ overflowX: "scroll", WebkitOverflowScrolling: "touch" }}
      >
        {characters.map((character) => (
          <CharacterItem key={character.id} character={character} />
        ))}
      </Grid>
    </Container>
  );
};
