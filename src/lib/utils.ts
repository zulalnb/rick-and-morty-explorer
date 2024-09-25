export function paginateItems<T>(
  array: T[],
  itemsPerPage: number = 3
): { paginatedArray: T[][]; totalPages: number } {
  const totalPages = Math.ceil(array.length / itemsPerPage);
  const paginatedArray: T[][] = [];

  for (let i = 0; i < array.length; i += itemsPerPage) {
    paginatedArray.push(array.slice(i, i + itemsPerPage));
  }

  return { paginatedArray, totalPages };
}

export const getRandomItems = <T>(
  array: T[],
  numberOfItems: number = 2
): T[] => {
  const shuffledArray = [...array].sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffledArray.slice(0, numberOfItems); // Return the first `numberOfItems` from the shuffled array
};
