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
import { Character } from "@/types/api/character";
import { Location } from "@/types/api/location";
import { normalizeStatusParam, paginateItems } from "@/lib/utils";
import { BASE_API_URL } from "@/lib/constants";
import { getLocationCharacters } from "@/lib/server/locationCharacters";

type Props = {
  params: Promise<{ id: string; page: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getLocationInfo = async (id: number): Promise<Location> => {
  const res = await fetch(`${BASE_API_URL}/location/${id}`);
  const data: Location = await res.json();
  return data;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const query = await searchParams;
  const { id, page } = await params;
  const location = await getLocationInfo(Number(id));

  if (!location) {
    return {
      title: "Page Not Found (404)",
      robots: { index: false, follow: false },
    };
  }

  const previousOpenGraph = (await parent).openGraph || {};

  const status = Array.isArray(query.status)
    ? query.status[0]
    : query.status || "";

  const statusQuery = status ? `/?status=${status}` : "";
  const canonicalPath = `/locations/${id}/characters/page/${page}${statusQuery}`;

  const title = `${capitalize(status)} Characters in ${
    location.name
  } - Page ${page}`;

  const description = `List of ${status || "all"} characters from ${
    location.name
  }, a planet in the ${
    location.dimension
  } dimension (Page ${page}). Explore the residents from the Rick and Morty universe.`;

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
  const page = Number(params.page) || 1;
  const status = Array.isArray(searchParams.status)
    ? searchParams.status[0]
    : searchParams.status;

  const isPageInvalid = !Number.isInteger(page) || page < 0;

  if (isPageInvalid) {
    return notFound();
  }

  const locationInfo = await getLocationInfo(Number(params.id));

  if (!locationInfo) {
    return notFound();
  }

  const { characters, totalPages } = await getLocationCharacters({
    residents: locationInfo.residents,
    page: Number(params.page),
    status: normalizeStatusParam(status),
  });

  if (characters.length < 1) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <Typography variant="h1" sx={visuallyHidden}>
          Characters
        </Typography>
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
      <CharacterList characters={characters} />
      <Pagination count={totalPages} currentPage={Number(params.page)} />
    </main>
  );
}
