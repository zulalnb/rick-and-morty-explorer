"use client";

import NextImage, { ImageProps } from "next/image";
import Box from "@mui/material/Box";

export const CharacterImageWrapper = (props: ImageProps) => {
  return (
    <Box sx={{ position: "relative", aspectRatio: 1 / 1 }}>
      <NextImage {...props} fill />
    </Box>
  );
};
