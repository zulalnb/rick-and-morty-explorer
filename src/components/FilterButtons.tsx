"use client";

import Link from "next/link";
import { Box, Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export const FilterButtons = ({ locationId }: { locationId: number }) => {
  return (
    <Box sx={{ marginBottom: 3, display: "flex", gap: 2 }}>
      <Button
        component={Link}
        href={`/locations/${locationId}/characters/?status=dead`}
        startIcon={<CircleIcon color="error" />}
        variant="outlined"
        color="inherit"
        sx={{ textTransform: "initial" }}
      >
        Dead
      </Button>
      <Button
        component={Link}
        href={`/locations/${locationId}/characters/?status=alive`}
        startIcon={<CircleIcon color="success" />}
        variant="outlined"
        color="inherit"
        sx={{ textTransform: "initial" }}
      >
        Alive
      </Button>
      <Button
        component={Link}
        href={`/locations/${locationId}/characters/?status=unknown`}
        startIcon={<CircleIcon color="disabled" />}
        variant="outlined"
        color="inherit"
        sx={{ textTransform: "initial" }}
      >
        Unknown
      </Button>
    </Box>
  );
};
