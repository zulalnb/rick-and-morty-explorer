import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CharacterListSkeleton from "@/components/CharacterListSkeleton";

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

      <CharacterListSkeleton />
    </Container>
  );
}
