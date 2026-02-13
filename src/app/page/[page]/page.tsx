import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { LocationList } from "@/components/LocationList";
import { Pagination } from "@/components/Pagination";
import { LocationAPIResponse } from "@/types/api/location";
import { BASE_API_URL } from "@/lib/constants";

type Params = Promise<{ page: string }>;

type Props = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getLocations = async (page: number = 1): Promise<LocationAPIResponse> => {
  const res = await fetch(`${BASE_API_URL}/location?page=${page}`, {
    next: { revalidate: 3600 },
  });
  const data: LocationAPIResponse = await res.json();
  return data;
};

export async function generateMetadata(
  { params, searchParams: _searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const page = (await params).page;
  const currentPage = Number(page);

  if (isNaN(currentPage) || !Number.isInteger(currentPage) || currentPage < 1) {
    return {
      title: "Page Not Found (404)",
      robots: { index: false, follow: false },
    };
  }

  const locations = await getLocations(currentPage);

  if (!locations.results) {
    return {
      title: "Page Not Found (404)",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/page/${currentPage}`;
  const previousOpenGraph = (await parent).openGraph || {};

  const title = `Rick and Morty Locations - Page ${currentPage} of ${locations.info.pages}`;
  const description = `Continue exploring iconic locations from the Rick and Morty universe on page ${currentPage}. Discover unique planets, dimensions, and the characters who inhabit them..`;

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

export default async function Locations(props: { params: Params }) {
  const params = await props.params;
  const currentPage = Number(params.page);

  if (isNaN(currentPage) || !Number.isInteger(currentPage) || currentPage < 1) {
    return notFound();
  }

  const locations = await getLocations(currentPage);

  if (!locations.results) {
    return notFound();
  }

  return (
    <Container component={"main"} sx={{ marginY: 6 }}>
      <Typography variant="h1" sx={visuallyHidden}>
        Locations
      </Typography>
      <LocationList locations={locations.results} />
      <Pagination count={locations.info.pages} currentPage={currentPage} />
    </Container>
  );
}
