"use client";

import Grid from "@mui/material/Grid";
import { LocationItem } from "./LocationItem";
import { Location } from "@/types/api/location";

export const LocationList = ({
  locations,
}: {
  locations: readonly Location[];
}) => {
  return (
    <Grid container component="ul" spacing={{ xs: 4, md: 8 }}>
      {locations.map((location) => (
        <LocationItem key={location.id} location={location} component="li" />
      ))}
    </Grid>
  );
};
