import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { LocationSkeleton } from "@/components/LocationSkeleton";

export default function Loading() {
  return (
    <Container sx={{ marginY: 6 }}>
      <Grid container component="ul" spacing={{ xs: 4, md: 8 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <LocationSkeleton key={i} />
        ))}
      </Grid>
    </Container>
  );
}
