import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CharacterList } from "@/components/CharacterList";
import { Pagination } from "@/components/Pagination";
import { LocationDetail } from "@/types/locationDetail";
import { Character } from "@/types/character";
import { paginateItems } from "@/lib/utils";

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

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { page?: number; status?: string };
}) {
  const locationInfo = await getLocationInfo(params.id);

  const queryParams = searchParams.status
    ? `/?status=${searchParams.status}`
    : "";
  const pathname = `/locations/${params.id}/characters${queryParams}`;

  const characterIds = locationInfo.residents.map((residentUrl) => {
    const parts = residentUrl.split("/");
    return parseInt(parts[parts.length - 1], 10);
  });

  const allCharacters =
    characterIds.length > 0
      ? await getCharacterDetailsByLocation(characterIds)
      : [];

  const filteredCharacters = searchParams.status
    ? allCharacters.filter(
        (character) => character.status.toLowerCase() === searchParams.status
      )
    : allCharacters;

  const { paginatedArray, totalPages } = paginateItems(filteredCharacters);

  const characters =
    paginatedArray[searchParams.page ? searchParams.page - 1 : 0];

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
      {characters && (
        <>
          <CharacterList characters={characters} />
          <Pagination
            count={totalPages}
            currentPage={Number(searchParams.page) || 1}
            pathname={pathname}
            isQueryParam
          />
        </>
      )}
    </Container>
  );
}
