"use client";

import { CharacterList } from "@/components/CharacterList";
import { useAppSelector } from "@/lib/hooks";

export function FavoriteCharacterList() {
  const favorites = useAppSelector((state) => state.favorites);
  return (
    <main>
      {favorites.length > 0 && <CharacterList characters={favorites} />}
    </main>
  );
}
