import type { Metadata, ResolvingMetadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { LocationList } from "@/components/LocationList";
import { Pagination } from "@/components/Pagination";
import { LocationAPIResponse } from "@/types/location";

type Props = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getLocations = async (page = 1): Promise<LocationAPIResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/location?page=${page}`
  );
  const data: LocationAPIResponse = await res.json();
  return data;
};

export async function generateMetadata(
  { params: _params, searchParams: _searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousOpenGraph = (await parent).openGraph || {};

  const title = "All Rick and Morty Locations";
  const description =
    "Explore a complete list of all iconic locations from the Rick and Morty multiverse. Discover dimensions, see resident characters, and dive deep into the show's lore.";

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      ...previousOpenGraph,
      title,
      description,
      url: "/",
    },
  };
}

export default async function Page() {
  const locations = await getLocations();
  return (
    <Container component={"main"} sx={{ marginY: 6 }}>
      <Typography variant="h1" sx={visuallyHidden}>
        Locations
      </Typography>
      {locations.results && (
        <>
          <LocationList locations={locations.results} />
          <Pagination count={locations.info.pages} currentPage={1} />
        </>
      )}
    </Container>
  );
}
