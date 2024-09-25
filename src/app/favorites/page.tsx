"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CharacterList } from "@/components/CharacterList";
import { Pagination } from "@/components/Pagination";
import { paginateItems } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

export default function Page({
  searchParams,
}: {
  searchParams: { page?: number; status?: string };
}) {
  const pathname = `/favorites`;
  const favorites = useAppSelector((state) => state.favorites);
  const { paginatedArray, totalPages } = paginateItems(favorites);
  const characters =
    paginatedArray[searchParams.page ? searchParams.page - 1 : 0];
  return (
    <main>
      <Container sx={{ marginY: 4 }}>
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
          Favorites
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
    </main>
  );
}
