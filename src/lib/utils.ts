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
