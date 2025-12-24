import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Loading() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Skeleton
          variant="text"
          sx={{ fontSize: "1.125rem", lineHeight: 1.5, width: 120 }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1.125rem", lineHeight: 1.5, width: 104 }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <Skeleton variant="rounded" width={120} height={36} />
        <Skeleton variant="rounded" width={120} height={36} />
        <Skeleton variant="rounded" width={120} height={36} />
      </Box>
      <Grid container spacing={8}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid
            key={i}
            size={{ xs: 12, md: 4 }}
            display={{ xs: i === 0 ? "block" : "none", md: "block" }}
          >
            <Box sx={{ aspectRatio: "1/1" }}>
              <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </Box>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", lineHeight: 1.5 }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", lineHeight: 1.5 }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
