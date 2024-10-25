"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      scrollRef.current.scrollTop = 0;
    }
  }, [searchParams]);

  return (
    <Container
      sx={(theme: Theme) => ({
        [theme.breakpoints.down("sm")]: {
          paddingX: 0,
        },
      })}
    >
      <Grid
        ref={scrollRef}
        container
        spacing={{ xs: 4, md: 8 }}
        flexWrap={{ xs: "nowrap", md: "wrap" }}
        px={{ xs: 2, md: 0 }}
        sx={{
          overflowX: "scroll",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {characters.map((character) => (
          <CharacterItem key={character.id} character={character} />
        ))}
      </Grid>
    </Container>
  );
};
