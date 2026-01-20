import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { unstable_capitalize as capitalize, visuallyHidden } from "@mui/utils";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import PublicOff from "@mui/icons-material/PublicOff";
import { FilterButtons } from "@/components/FilterButtons";
import CharacterListSection from "@/components/CharacterListSection";
import CharacterListSkeleton from "@/components/CharacterListSkeleton";
import { normalizeStatusParam } from "@/lib/utils";
import { BASE_API_URL } from "@/lib/constants";
import { getLocationCharacters } from "@/lib/server/locationCharacters";
import { Location } from "@/types/api/location";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getLocationInfo = async (id: number): Promise<Location> => {
  const res = await fetch(`${BASE_API_URL}/location/${id}`, {
    next: { revalidate: 3600 },
  });
  const data: Location = await res.json();
  return data;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const query = await searchParams;
  const { id } = await params;
  const page = Number(
    typeof query.page === "string"
      ? query.page
      : Array.isArray(query.page)
        ? query.page[0]
        : 1,
  );

  const status = Array.isArray(query.status)
    ? query.status[0]
    : query.status || "";

  const normalizedStatus = normalizeStatusParam(status);

  const isPageInvalid = isNaN(page) || !Number.isInteger(page) || page < 1;

  if (isPageInvalid || (status && !normalizedStatus)) {
    return {
      title: "Page Not Found (404)",
      robots: { index: false, follow: false },
    };
  }

  const previousOpenGraph = (await parent).openGraph || {};
  const location = await getLocationInfo(Number(id));

  if (!location) {
    return {
      title: "Page Not Found (404)",
      robots: { index: false, follow: false },
    };
  }

  const { characters, totalPages } = await getLocationCharacters({
    residents: location.residents,
    page,
    status: normalizedStatus,
  });

  if (characters.length < 1 && page > totalPages) {
    return {
      title: "Page Not Found (404)",
      robots: { index: false, follow: false },
    };
  }

  const searchQuery = new URLSearchParams();
  if (status) {
    searchQuery.set("status", status);
  }
  if (page > 1) {
    searchQuery.set("page", String(page));
  }

  const canonicalPath = searchQuery.toString()
    ? `/locations/${id}/characters?${searchQuery.toString()}`
    : `/locations/${id}/characters`;

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

export default async function Characters(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const id = Number(params.id);
  const page = Number(
    typeof searchParams.page === "string"
      ? searchParams.page
      : Array.isArray(searchParams.page)
        ? searchParams.page[0]
        : 1,
  );

  const status = Array.isArray(searchParams.status)
    ? searchParams.status[0]
    : searchParams.status;

  const normalizedStatus = normalizeStatusParam(status);
  const isPageInvalid = !Number.isInteger(page) || page < 1;

  if (isPageInvalid || (status && !normalizedStatus)) {
    return notFound();
  }

  const locationInfo = await getLocationInfo(id);

  if (!locationInfo) {
    return notFound();
  }

  const residents = locationInfo.residents;

  if (residents.length < 1) {
    return (
      <Container>
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
            href="/"
            sx={{ mt: 2, display: "inline-block" }}
          >
            Explore Other Locations
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <main>
      <Container>
        <Typography variant="h1" sx={visuallyHidden}>
          {locationInfo.name} - Characters
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

      <Suspense
        fallback={
          <Container>
            <CharacterListSkeleton />
          </Container>
        }
      >
        <CharacterListSection
          residents={residents}
          locationId={Number(params.id)}
          status={normalizedStatus}
          page={page}
        />
      </Suspense>
    </main>
  );
}
