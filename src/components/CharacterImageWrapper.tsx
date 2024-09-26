"use client";

import NextImage, { ImageProps } from "next/image";
import Box from "@mui/material/Box";

export const CharacterImageWrapper = (props: ImageProps) => {
  return (
    <Box sx={{ position: "relative", aspectRatio: 1 / 1 }}>
      <NextImage
        {...props}
        fill
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
    </Box>
  );
};
