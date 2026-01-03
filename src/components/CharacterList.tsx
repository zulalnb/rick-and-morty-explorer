"use client";

import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Character } from "@/types/api/character";

import CharacterListSkeleton from "./CharacterListSkeleton";

const CharacterSwiper = dynamic(
  () => import("./CharacterSwiper").then((mod) => mod.CharacterSwiper),
  {
    ssr: false,
    loading: () => (
      <Box paddingX={{ xs: 2, sm: 0 }}>
        <CharacterListSkeleton />
      </Box>
    ),
  }
);

export const CharacterList = ({
  characters,
}: {
  characters: readonly Character[];
}) => {
  return (
    <Container
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          paddingX: 0,
        },
      })}
    >
      <CharacterSwiper characters={characters} />
    </Container>
  );
};
