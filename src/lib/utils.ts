import { CharacterStatus } from "@/types/domain/location";

const VALID_STATUSES = ["alive", "dead", "unknown"] as const;

export const paginateItems = <T>(
  array: T[],
  itemsPerPage: number = 3
): { paginatedArray: T[][]; totalPages: number } => {
  const paginatedArray = array.reduce<T[][]>((acc, _, index) => {
    if (index % itemsPerPage === 0) {
      acc.push(array.slice(index, index + itemsPerPage));
    }
    return acc;
  }, []);

  const totalPages = paginatedArray.length;

  return { paginatedArray, totalPages };
};

export const getRandomItems = <T>(
  array: T[],
  numberOfItems: number = 2
): T[] => {
  const shuffledArray = [...array].sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffledArray.slice(0, numberOfItems); // Return the first `numberOfItems` from the shuffled array
};

export const normalizePath = (path: string) => {
  const segments = path.split("/").filter(Boolean);

  if (
    segments.length >= 2 &&
    segments.at(-2) === "page" &&
    !isNaN(Number(segments.at(-1)))
  ) {
    return "/" + segments.slice(0, -2).join("/");
  }
  return "/" + segments.join("/");
};

export function normalizeStatusParam(
  value: string | string[] | undefined
): CharacterStatus | undefined {
  if (typeof value !== "string") return undefined;

  const normalized = value.toLowerCase();

  return (VALID_STATUSES as readonly string[]).includes(normalized)
    ? (normalized as CharacterStatus)
    : undefined;
}
