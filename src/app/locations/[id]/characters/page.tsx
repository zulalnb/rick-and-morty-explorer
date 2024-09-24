import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CharacterList } from "@/components/CharacterList";
import { LocationDetail } from "@/types/locationDetail";
import { Character } from "@/types/character";

const getLocationInfo = async (id: number): Promise<LocationDetail> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/location/${id}`
  );
  const data: LocationDetail = await res.json();
  return data;
};

const getCharacterDetailsByLocation = async (
  ids: number[]
): Promise<Character[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/character/${ids}`
  );
  const data: Character[] = await res.json();
  return data;
};

export default async function Page({ params }: { params: { id: number } }) {
  const locationInfo = await getLocationInfo(params.id);

  const characterIds = locationInfo.residents.map((residentUrl) => {
    const parts = residentUrl.split("/");
    return parseInt(parts[parts.length - 1], 10);
  });

  const characters = await getCharacterDetailsByLocation(characterIds);

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
        Characters
      </Typography>
      {characters && <CharacterList characters={characters} />}
    </Container>
  );
}
