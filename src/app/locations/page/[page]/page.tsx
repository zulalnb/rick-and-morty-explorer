import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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

export default async function Page(props: { params: Promise<{ page: number }> }) {
  const params = await props.params;
  const locations = await getLocations(params.page);
  return (
    <Container component={"main"} sx={{ marginY: 6 }}>
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          width: "1px",
          height: "1px",
          p: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        Locations
      </Typography>
      {locations.results && (
        <>
          <LocationList locations={locations.results} />
          <Pagination
            count={locations.info.pages}
            currentPage={Number(params.page)}
            pathname="/locations"
          />
        </>
      )}
    </Container>
  );
}
