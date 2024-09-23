import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { LocationList } from "@/components/LocationList";

const getLocations = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/location?page=1`
  );
  const data = await res.json();
  return data;
};

export default async function Page() {
  const locations = await getLocations();
  return (
    <Container component={"main"} sx={{ marginY: 6 }}>
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          p: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        Locations
      </Typography>
      {locations.results && <LocationList locations={locations.results} />}
    </Container>
  );
}
