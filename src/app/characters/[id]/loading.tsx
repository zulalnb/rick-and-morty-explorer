import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Loading() {
  return (
    <Container sx={{ marginY: 4 }}>
      <Grid container spacing={{ xs: 6, md: 8 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ aspectRatio: "1/1" }}>
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Box>
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", lineHeight: 1.5, marginBottom: 4 }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ aspectRatio: "1/1", width: "20%" }}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.5rem", lineHeight: 1.5 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.5 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      marginTop: "auto",
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ aspectRatio: "1/1", width: "20%" }}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.5rem", lineHeight: 1.5 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.125rem", lineHeight: 1.5 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      marginTop: "auto",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
