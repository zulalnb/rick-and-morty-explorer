import NextLink from "next/link";
import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchOff from "@mui/icons-material/SearchOff";
import { CharacterList } from "@/components/CharacterList";
import { Pagination } from "@/components/Pagination";
import { getLocationCharacters } from "@/lib/server/locationCharacters";
import { CharacterStatus } from "@/types/domain/location";

export default async function CharacterListSection({
  residents,
  page,
  status,
  locationId,
}: {
  residents: string[];
  page: number;
  status?: CharacterStatus;
  locationId: number;
}) {
  const { characters, totalPages } = await getLocationCharacters({
    residents,
    page,
    status,
  });

  if (totalPages > 0 && page > totalPages) {
    return notFound();
  }

  if (characters.length < 1) {
    return (
      <Box textAlign="center" py={8}>
        <SearchOff sx={{ fontSize: 72, color: "action.active" }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          No Matching Characters
        </Typography>
        <Typography color="text.secondary">
          No characters with the selected status in this location.
        </Typography>
        <Button
          variant="outlined"
          component={NextLink}
          href={`/locations/${locationId}/characters`}
          sx={{ mt: 2 }}
          size="large"
        >
          Clear Filter
        </Button>
      </Box>
    );
  }

  return (
    <>
      <CharacterList characters={characters} />
      <Pagination count={totalPages} currentPage={page} />
    </>
  );
}
