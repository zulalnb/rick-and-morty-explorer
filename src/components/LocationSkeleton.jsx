"use client";

import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid2";

export const LocationSkeleton = () => {
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      sx={{ border: "1px solid black", borderRadius: 4, padding: 2 }}
    >
      <Skeleton variant="text" sx={{ fontSize: "1.75rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.75rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.75rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1.75rem" }} />
    </Grid>
  );
};
