"use client";

import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

export const LocationSkeleton = () => {
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.2)",
        borderRadius: 8,
        padding: "8px 20px",
      }}
    >
      {Array.from(Array(4)).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          sx={{ fontSize: "1rem", lineHeight: 1.5 }}
        />
      ))}
    </Grid>
  );
};
