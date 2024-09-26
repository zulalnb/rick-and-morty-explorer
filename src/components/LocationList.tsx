"use client";

import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid2";
import { Location } from "@/types/location";
import { LocationSkeleton } from "./LocationSkeleton";

const LocationItem = dynamic(
  () => import("./LocationItem").then((m) => m.LocationItem),
  { ssr: false, loading: () => <LocationSkeleton /> }
);

export const LocationList = ({
  locations,
}: {
  locations: readonly Location[];
}) => {
  return (
    <Grid container spacing={{ xs: 4, md: 8 }}>
      {locations.map((location) => (
        <LocationItem key={location.id} location={location} />
      ))}
    </Grid>
  );
};
