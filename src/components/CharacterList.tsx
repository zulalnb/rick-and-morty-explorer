"use client";

import { usePathname } from "next/navigation";
import { Theme } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { CharacterItem } from "./CharacterItem";
import { Character } from "@/types/character";

export const CharacterList = ({
  characters,
}: {
  characters: readonly Character[];
}) => {
  const pathname = usePathname();

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
        flexWrap={{
          xs: pathname === "/favorites/" ? "wrap" : "nowrap",
          md: "wrap",
        }}
        px={{ xs: 2, md: 0 }}
        sx={{
          ...(pathname !== "/favorites/" && {
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }),
        }}
      >
        {characters.map((character) => (
          <Grid
            key={character.id}
            size={{
              xs: 12,
              md: pathname === "/favorites/" ? 6 : 4,
            }}
            flexShrink={{ xs: 0, md: 1 }}
          >
            <CharacterItem character={character} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
