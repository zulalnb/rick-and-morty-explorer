"use client";

import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import { Location } from "@/types/api/location";
import { LocationSkeleton } from "./LocationSkeleton";

const LocationItem = dynamic(
  () => import("./LocationItem").then((m) => m.LocationItem),
  { ssr: false, loading: () => <LocationSkeleton component="li" /> }
);

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
