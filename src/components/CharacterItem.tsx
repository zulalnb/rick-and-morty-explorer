"use client";

import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types/character";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleFavorite } from "@/lib/features/favorite/favoriteSlice";

export const CharacterItem = ({ character }: { character: Character }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const isFavorite = favorites.find((item) => item.id === character.id);

  return (
    <Grid key={character.id} size={{ xs: 12, md: 4 }}>
      <Box sx={{ position: "relative", aspectRatio: 1 / 1 }}>
        <Image
          src={character.image}
          alt={character.name}
          fill
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />
        <IconButton
          onClick={() => dispatch(toggleFavorite(character))}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            color: isFavorite ? "red" : "white",
          }}
        >
          <FavoriteIcon
            sx={{
              fontSize: 36,
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "gray", fontSize: 24 }}>
            {character.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircleIcon
              color={
                character.status === "Dead"
                  ? "error"
                  : character.status === "Alive"
                  ? "success"
                  : "disabled"
              }
            />
            <Typography>
              {character.status} - {character.species}
            </Typography>
          </Box>
        </Box>

        <Link href={`/characters/${character.id}`}>
          <ArrowForwardIosIcon />
        </Link>
      </Box>
    </Grid>
  );
};
