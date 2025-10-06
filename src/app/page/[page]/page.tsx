import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { LocationList } from "@/components/LocationList";
import { Pagination } from "@/components/Pagination";
import { LocationAPIResponse } from "@/types/location";

const getLocations = async (page: number = 1): Promise<LocationAPIResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/location?page=${page}`
  );
  const data: LocationAPIResponse = await res.json();
  return data;
};

export default async function Page(props: {
  params: Promise<{ page: number }>;
}) {
  const params = await props.params;
  const locations = await getLocations(params.page);
  return (
    <Container component={"main"} sx={{ marginY: 6 }}>
      <Typography variant="h1" sx={visuallyHidden}>
        Locations
      </Typography>
      {locations.results && (
        <>
          <LocationList locations={locations.results} />
          <Pagination
            count={locations.info.pages}
            currentPage={Number(params.page)}
          />
        </>
      )}
    </Container>
  );
}
