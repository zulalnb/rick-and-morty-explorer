import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { LocationList } from "@/components/LocationList";
import { Pagination } from "@/components/Pagination";

const getLocations = async (page = 1) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/location?page=${page}`
  );
  const data = await res.json();
  return data;
};

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
          <Pagination
            count={locations.info.pages}
            currentPage={1}
            pathname="locations"
          />
        </>
      )}
    </Container>
  );
}
