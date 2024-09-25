"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";

export const FilterButtons = ({ locationId }: { locationId: number }) => {
  return (
    <Container
      sx={(theme: Theme) => ({
        [theme.breakpoints.down("sm")]: {
          paddingX: 0,
        },
      })}
    >
      <Box
        sx={(theme: Theme) => ({
          marginBottom: 3,
          display: "flex",
          gap: 2,
          whiteSpace: "nowrap",
          overflowX: "scroll",
          "-webkit-overflow-scrolling": "touch",
          pb: 1,
          [theme.breakpoints.down("sm")]: {
            paddingX: 2,
          },
        })}
      >
        <Button
          component={Link}
          href={`/locations/${locationId}/characters/?status=dead`}
          startIcon={<CircleIcon color="error" />}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "initial", width: 130, minWidth: 130 }}
        >
          Dead
        </Button>
        <Button
          component={Link}
          href={`/locations/${locationId}/characters/?status=alive`}
          startIcon={<CircleIcon color="success" />}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "initial", width: 130, minWidth: 130 }}
        >
          Alive
        </Button>
        <Button
          component={Link}
          href={`/locations/${locationId}/characters/?status=unknown`}
          startIcon={<CircleIcon color="disabled" />}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "initial", width: 130, minWidth: 130 }}
        >
          Unknown
        </Button>
      </Box>
    </Container>
  );
};
