import "server-only";
import { paginateItems } from "../utils";
import { BASE_API_URL } from "../constants";
import { Character } from "@/types/api/character";
import { CharacterStatus } from "@/types/domain/location";

type GetLocationCharactersParams = {
  residents: string[];
  status?: CharacterStatus;
  page?: number;
  pageSize?: number;
};

const getCharacterDetailsByLocation = async (
  ids: number[]
): Promise<Character[]> => {
  const res = await fetch(`${BASE_API_URL}/character/${ids}`);
  const data: Character[] = await res.json();
  const verifyData: Character[] = Array.isArray(data) ? data : [data];
  return verifyData;
};

export async function getLocationCharacters({
  residents,
  status,
  page = 1,
  pageSize = 3,
}: GetLocationCharactersParams) {
  const characterIds = residents
    .map((url) => Number(url.split("/").pop()))
    .filter((id) => !isNaN(id));

  if (characterIds.length === 0) {
    return {
      characters: [],
      totalPages: 0,
      totalCount: 0,
    };
  }

  const allCharacters = await getCharacterDetailsByLocation(characterIds);

  const filteredCharacters = status
    ? allCharacters.filter((c) => c.status.toLowerCase() === status)
    : allCharacters;

  const totalCount = filteredCharacters.length;

  // pagination is ALWAYS applied, page defaults to 1
  const { paginatedArray, totalPages } = paginateItems(
    filteredCharacters,
    pageSize
  );

  const characters = paginatedArray[page - 1] ?? [];

  return {
    characters,
    totalPages,
    totalCount,
  };
}
