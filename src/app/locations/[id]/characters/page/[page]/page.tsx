import type { Metadata, ResolvingMetadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { unstable_capitalize as capitalize, visuallyHidden } from "@mui/utils";
import { CharacterList } from "@/components/CharacterList";
import { FilterButtons } from "@/components/FilterButtons";
import { Pagination } from "@/components/Pagination";
import { LocationDetail } from "@/types/locationDetail";
import { Character } from "@/types/character";
import { paginateItems } from "@/lib/utils";
import { BASE_API_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ id: string; page: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getLocationInfo = async (id: number): Promise<LocationDetail> => {
  const res = await fetch(`${BASE_API_URL}/location/${id}`);
  if (!res.ok) {
    notFound();
  }
  const data: LocationDetail = await res.json();
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
  const { id, page } = await params;
  const location = await getLocationInfo(Number(id));
  const previousOpenGraph = (await parent).openGraph || {};

  const status = Array.isArray(query.status)
    ? query.status[0]
    : query.status || "";

  const title = `${capitalize(status)} Characters in ${
    location.name
  } - Page ${page}`;

  const description = `List of ${status || "all"} characters from ${
    location.name
  }, a planet in the ${
    location.dimension
  } dimension (Page ${page}). Explore the residents from the Rick and Morty universe.`;

  const canonicalPath = `/locations/${id}/characters/page/${page}`;

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

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locationInfo = await getLocationInfo(Number(params.id));

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

  const characters = paginatedArray[params.page ? Number(params.page) - 1 : 0];

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
          <FilterButtons />
        </>
      )}
      {characters && (
        <>
          <CharacterList characters={characters} />
          <Pagination count={totalPages} currentPage={Number(params.page)} />
        </>
      )}
    </main>
  );
}
