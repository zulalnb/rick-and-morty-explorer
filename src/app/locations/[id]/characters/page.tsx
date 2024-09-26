import NextLink from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { CharacterList } from "@/components/CharacterList";
import { FilterButtons } from "@/components/FilterButtons";
import { Pagination } from "@/components/Pagination";
import { LocationDetail } from "@/types/locationDetail";
import { Character } from "@/types/character";
import { paginateItems } from "@/lib/utils";

const getLocationInfo = async (id: number): Promise<LocationDetail> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/location/${id}`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch character with ID: ${id}`);
  }
  const data: LocationDetail = await res.json();
  return data;
};

const getCharacterDetailsByLocation = async (
  ids: number[]
): Promise<Character[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/character/${ids}`
  );
  const data: Character[] = await res.json();
  const verifyData: Character[] = Array.isArray(data) ? data : [data];
  return verifyData;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page?: number; status?: string };
}) {
  const locationInfo = await getLocationInfo(params.id);

  const queryParams = searchParams.status
    ? `/?status=${searchParams.status}`
    : "";
  const pathname = `/locations/${params.id}/characters${queryParams}`;

  const characterIds = locationInfo.residents.map((residentUrl) => {
    const parts = residentUrl.split("/");
    return parseInt(parts[parts.length - 1], 10);
  });

  const allCharacters =
    characterIds.length > 0
      ? await getCharacterDetailsByLocation(characterIds)
      : [];

  const filteredCharacters = searchParams.status
    ? allCharacters.filter(
        (character) => character.status.toLowerCase() === searchParams.status
      )
    : allCharacters;

  const { paginatedArray, totalPages } = paginateItems(filteredCharacters);

  const characters =
    paginatedArray[searchParams.page ? searchParams.page - 1 : 0];

  return (
    <main>
      <Container sx={{ marginY: 4 }}>
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            width: "1px",
            height: "1px",
            p: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        >
          Characters
        </Typography>
      </Container>
      {allCharacters && (
        <>
          <Container sx={{ marginTop: 2, marginBottom: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                Filter by status
              </Typography>
              <Link
                component={NextLink}
                href="/favorites"
                color="inherit"
                sx={{ fontWeight: "bold", fontSize: 18 }}
              >
                My Favorites
              </Link>
            </Box>
          </Container>
          <FilterButtons locationId={params.id} />
        </>
      )}
      {characters && (
        <>
          <CharacterList characters={characters} />
          <Container sx={{ marginY: 4 }}>
            <Pagination
              count={totalPages}
              currentPage={Number(searchParams.page) || 1}
              pathname={pathname}
              isQueryParam
            />
          </Container>
        </>
      )}
    </main>
  );
}
