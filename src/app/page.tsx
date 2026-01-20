import type { Metadata, ResolvingMetadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { LocationList } from "@/components/LocationList";
import { Pagination } from "@/components/Pagination";
import { LocationAPIResponse } from "@/types/api/location";
import { BASE_API_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getLocations = async (page = 1): Promise<LocationAPIResponse> => {
  const res = await fetch(`${BASE_API_URL}/location?page=${page}`, {
    next: { revalidate: 3600 },
  });
  const data: LocationAPIResponse = await res.json();
  return data;
};

export async function generateMetadata(
  { params: _params, searchParams: _searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousOpenGraph = (await parent).openGraph || {};

  return {
    alternates: {
      canonical: "/",
    },
    openGraph: {
      ...previousOpenGraph,
      url: "/",
    },
  };
}

export default async function Home() {
  const locations = await getLocations();
  return (
    <Container component={"main"} sx={{ marginY: 6 }}>
      <Typography variant="h1" sx={visuallyHidden}>
        Locations
      </Typography>
      <LocationList locations={locations.results} />
      <Pagination count={locations.info.pages} currentPage={1} />
    </Container>
  );
}
