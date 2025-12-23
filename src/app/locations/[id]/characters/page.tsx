import type { Metadata, ResolvingMetadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PublicOff from "@mui/icons-material/PublicOff";
import SearchOff from "@mui/icons-material/SearchOff";
import { unstable_capitalize as capitalize, visuallyHidden } from "@mui/utils";

import { CharacterList } from "@/components/CharacterList";
import { FilterButtons } from "@/components/FilterButtons";
import { Pagination } from "@/components/Pagination";
import { Character } from "@/types/api/character";
import { paginateItems } from "@/lib/utils";
import { BASE_API_URL } from "@/lib/constants";
import { Location } from "@/types/api/location";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getLocationInfo = async (id: number): Promise<Location> => {
  const res = await fetch(`${BASE_API_URL}/location/${id}`);
  if (!res.ok) {
    notFound();
  }
  const data: Location = await res.json();
  return data;
};

const getCharacterDetailsByLocation = async (
  ids: number[]
): Promise<Character[]> => {
  const res = await fetch(`${BASE_API_URL}/character/${ids}`);
  const data: Character[] = await res.json();
  const verifyData: Character[] = Array.isArray(data) ? data : [data];
  return verifyData;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const query = await searchParams;
  const { id } = await params;
  const location = await getLocationInfo(Number(id));
  const previousOpenGraph = (await parent).openGraph || {};

  const status = Array.isArray(query.status)
    ? query.status[0]
    : query.status || "";

  const statusQuery = status ? `/?status=${status}` : "";
  const canonicalPath = `/locations/${id}/characters${statusQuery}`;

  const title = `All ${status ? capitalize(status) + " " : ""}Characters in ${
    location.name
  }`;
  const description = `Discover all ${
    status ? status + " " : ""
  }characters from ${location.name}, a planet in the ${
    location.dimension
  } dimension. See the full list of residents from the Rick and Morty universe and learn about their status.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      ...previousOpenGraph,
      title,
      description,
      url: canonicalPath,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ id: number; page?: number }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locationInfo = await getLocationInfo(params.id);

  const characterIds = locationInfo.residents
    .map((url) => parseInt(url.split("/").pop() || "", 10))
    .filter((id) => !isNaN(id));

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

  const characters = paginatedArray[params.page ? params.page - 1 : 0];

  return (
    <main>
      <Container>
        <Typography variant="h1" sx={visuallyHidden}>
          Characters
        </Typography>
      </Container>
      {allCharacters.length > 0 && (
        <>
          <Container>
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
          <FilterButtons />
        </>
      )}
      {allCharacters.length < 1 && (
        <Box textAlign="center" py={8}>
          <PublicOff sx={{ fontSize: 72, color: "text.secondary" }} />
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            No Residents Found
          </Typography>
          <Typography color="text.secondary">
            This location seems uninhabited, no characters live here.
          </Typography>
          <Link
            component={NextLink}
            href="/locations"
            sx={{ mt: 2, display: "inline-block" }}
          >
            Explore Other Locations
          </Link>
        </Box>
      )}
      {allCharacters.length > 0 && filteredCharacters.length < 1 && (
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
            href={`/locations/${params.id}/characters`}
            sx={{ mt: 2 }}
            size="large"
          >
            Clear Filter
          </Button>
        </Box>
      )}
      {characters && (
        <>
          <CharacterList characters={characters} />
          <Pagination count={totalPages} currentPage={1} />
        </>
      )}
    </main>
  );
}
