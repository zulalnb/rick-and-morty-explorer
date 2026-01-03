import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function CharacterListSkeleton() {
  return (
    <Grid container spacing={{ xs: 4, md: 8 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Grid
          key={i}
          size={{ xs: 12, sm: 4 }}
          display={{ xs: i === 0 ? "block" : "none", sm: "block" }}
        >
          <Box sx={{ aspectRatio: "1/1" }}>
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Box>
          <Skeleton
            variant="text"
            sx={{ fontSize: "1.5rem", lineHeight: 1.5 }}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", lineHeight: 1.5 }} />
        </Grid>
      ))}
    </Grid>
  );
}
