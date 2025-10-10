import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

export default function Loading() {
  return (
    <Container sx={{ marginY: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Stack width={120}>
          <Skeleton variant="text" sx={{ fontSize: "2.4rem" }} />
        </Stack>
        <Stack width={120}>
          <Skeleton variant="text" sx={{ fontSize: "2.4rem" }} />
        </Stack>
      </Box>

      <Box sx={{ display: "flex", gap: 2, marginTop: 2, marginBottom: 4 }}>
        <Skeleton variant="rounded" width={130} height={36} />
        <Skeleton variant="rounded" width={130} height={36} />
        <Skeleton variant="rounded" width={130} height={36} />
      </Box>
      <Grid container spacing={8}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ aspectRatio: "1/1" }}>
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Box>
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </Grid>
        <Grid size={4} display={{ xs: "none", md: "block" }}>
          <Box sx={{ aspectRatio: "1/1" }}>
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Box>
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </Grid>
        <Grid size={4} display={{ xs: "none", md: "block" }}>
          <Box sx={{ aspectRatio: "1/1" }}>
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Box>
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </Grid>
      </Grid>
    </Container>
  );
}
