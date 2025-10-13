import type { Metadata, ResolvingMetadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { visuallyHidden } from "@mui/utils";

import { CharacterList } from "@/components/CharacterList";
import { FilterButtons } from "@/components/FilterButtons";
import { Pagination } from "@/components/Pagination";
import { LocationDetail } from "@/types/locationDetail";
import { Character } from "@/types/character";
import { paginateItems } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getLocationInfo = async (id: number): Promise<LocationDetail> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/location/${id}`
  );
  if (!res.ok) {
    notFound();
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

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const status = (await searchParams).status || "";
  const { id } = await params;
  const location = await getLocationInfo(Number(id));
  const previousOpenGraph = (await parent).openGraph || {};
  const title = status + location.name;
  const description = `Explore the ${status} characters of ${location.name}, a Planet located in ${location.dimension} from the Rick and Morty universe. Check out its residents and their journeys.`;

  const canonicalPath = `/locations/${id}/characters/`;

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

  const characters = paginatedArray[params.page ? params.page - 1 : 0];

  return (
    <main>
      <Container>
        <Typography variant="h1" sx={visuallyHidden}>
          Characters
        </Typography>
      </Container>
      {allCharacters && (
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
          <FilterButtons locationId={params.id} />
        </>
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
