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
  ids: number[],
): Promise<Character[]> => {
  const res = await fetch(`${BASE_API_URL}/character/${ids}`, {
    next: { revalidate: 3600 },
  });
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
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      totalPages: 0,
      totalCount: 0,
    };
  }

  const allCharacters = await getCharacterDetailsByLocation(characterIds);

  const filteredCharacters = status
    ? allCharacters.filter((c) => c.status.toLowerCase() === status)
    : allCharacters;

  const count = filteredCharacters.length;

  // pagination is ALWAYS applied, page defaults to 1
  const { paginatedArray, totalPages } = paginateItems(
    filteredCharacters,
    pageSize,
  );

  const safePage =
    totalPages === 0 ? 1 : Math.min(Math.max(page, 1), totalPages);

  const characters = paginatedArray[safePage - 1] ?? [];

  return {
    characters,
    info: {
      count,
      pages: totalPages,
      next: safePage < totalPages ? safePage + 1 : null,
      prev: safePage > 1 ? safePage - 1 : null,
    },
    totalPages,
    totalCount: count,
  };
}
