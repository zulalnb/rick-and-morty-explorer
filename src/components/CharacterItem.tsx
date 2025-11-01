"use client";

import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleFavorite } from "@/lib/features/favorite/favoriteSlice";
import { Character } from "@/types/character";

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
  const href = !isDetail ? `/characters/${character.id}` : undefined;

  return (
    <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
      <Box sx={{ position: "relative", aspectRatio: 1 / 1 }}>
        <Image
          src={character.image}
          alt={character.name}
          fill
          priority
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
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.44)",
            bgcolor: "rgba(0,0,0,0.11)",
          }}
        >
          <FavoriteIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          ...(!isDetail && {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }),
        }}
      >
        <CardContent
          sx={{
            padding: 0,
            ...(!isDetail && { minWidth: 0 }),
            ...(isDetail && {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }),
          }}
        >
          <Box>
            <Typography
              component={isDetail ? "h1" : Link}
              href={href}
              sx={{
                display: "block",
                fontWeight: "bold",
                color: "gray",
                fontSize: 24,
                ...(!isDetail && {
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }),
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
              <Typography
                sx={{ fontSize: isDetail ? 18 : 16, fontStyle: "italic" }}
              >
                {character.location.name}
              </Typography>
            )}
          </Box>
          {isDetail && (
            <Typography
              sx={{
                fontStyle: "italic",
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginRight: 0.25,
              }}
            >
              {character.type || "-"} / {character.gender}
            </Typography>
          )}
        </CardContent>

        {!isDetail && <ArrowForwardIosIcon />}
      </Box>
    </Card>
  );
};
