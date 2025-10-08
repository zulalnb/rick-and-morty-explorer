"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleFavorite } from "@/lib/features/favorite/favoriteSlice";
import { Character } from "@/types/character";
import { CharacterImageWrapper } from "./CharacterImageWrapper";

export const CharacterItem = ({
  character,
  isDetail = false,
}: {
  character: Character;
  isDetail?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const isFavorite = favorites.find((item) => item.id === character.id);

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <CharacterImageWrapper
          src={character.image}
          alt={character.name}
          priority
        />
        <IconButton
          onClick={() => dispatch(toggleFavorite(character))}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            color: isFavorite ? "red" : "white",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.44)",
            bgcolor: "rgba(0,0,0,0.11)",
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
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            component={Link}
            href={`/characters/${character.id}`}
            sx={{
              fontWeight: "bold",
              color: "gray",
              fontSize: 24,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "block",
            }}
          >
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
            <Typography sx={{ fontSize: isDetail ? 18 : 16 }}>
              {character.status} - {character.species}
            </Typography>
          </Box>
          {isDetail && (
            <Typography fontStyle="italic">
              {character.location.name}
            </Typography>
          )}
        </Box>

        {isDetail ? (
          <Typography sx={{ fontStyle: "italic" }}>
            {character.type || "-"} / {character.gender}
          </Typography>
        ) : (
          <ArrowForwardIosIcon />
        )}
      </Box>
    </Box>
  );
};
