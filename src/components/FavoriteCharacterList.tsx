"use client";

import { CharacterList } from "@/components/CharacterList";
import { Pagination } from "@/components/Pagination";
import { paginateItems } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

export function FavoriteCharacterList({ page }: { page?: number }) {
  const pathname = `/favorites`;
  const favorites = useAppSelector((state) => state.favorites);
  const { paginatedArray, totalPages } = paginateItems(favorites, 2);
  const characters = paginatedArray[page ? page - 1 : 0];
  return (
    <main>
      {characters && (
        <>
          <CharacterList characters={characters} />
          <Pagination
            count={totalPages}
            currentPage={Number(page) || 1}
            pathname={pathname}
            isQueryParam
          />
        </>
      )}
    </main>
  );
}
