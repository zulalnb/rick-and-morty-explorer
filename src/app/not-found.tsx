"use client";

import NextLink from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

export default function NotFoundPage() {
  return (
    <Container
      sx={{
        textAlign: "center",
        py: 10,
      }}
    >
      <TravelExploreIcon sx={{ fontSize: 72, color: "info.main", mb: 2 }} />
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        404: Lost in Space
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        You seem to have traveled to a dimension that doesn’t exist. <br />
        Let’s get you back to the right timeline!
      </Typography>
      <Button
        component={NextLink}
        href="/"
        variant="contained"
        color="info"
        size="large"
      >
        Back to Home
      </Button>
    </Container>
  );
}
