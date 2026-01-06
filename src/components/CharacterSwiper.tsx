"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { CharacterItem } from "./CharacterItem";
import { Character } from "@/types/api/character";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";

export const CharacterSwiper = ({
  characters,
}: {
  characters: readonly Character[];
}) => {
  const searchParams = useSearchParams();
  const theme = useTheme();

  return (
    <>
      <Swiper
        key={searchParams.toString()}
        modules={[Pagination, A11y]}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        slidesPerView={"auto"}
        spaceBetween={32}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        breakpoints={{
          [theme.breakpoints.values.xs]: {
            slidesPerView: 1,
            spaceBetween: 32,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
          },
          [theme.breakpoints.values.sm]: {
            slidesPerView: 3,
            spaceBetween: 32,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
          [theme.breakpoints.values.md]: {
            slidesPerView: 3,
            spaceBetween: 64,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        }}
      >
        {characters.map((character, index) => (
          <SwiperSlide key={character.id}>
            <Link href={`/characters/${character.id}`}>
              <CharacterItem
                character={character}
                priority={index < 2}
                sizes="(max-width: 600px) 100vw, 33vw"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        className="custom-pagination"
        sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
      ></Box>
    </>
  );
};
