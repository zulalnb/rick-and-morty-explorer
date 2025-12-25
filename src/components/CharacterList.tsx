"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { CharacterItem } from "./CharacterItem";
import { Character } from "@/types/api/character";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";

export const CharacterList = ({
  characters,
}: {
  characters: readonly Character[];
}) => {
  const searchParams = useSearchParams();
  const theme = useTheme();

  return (
    <Container
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          paddingX: 0,
        },
        "& .swiper": {
          paddingLeft: "16px",
          paddingRight: "16px",
          [theme.breakpoints.up("sm")]: {
            paddingLeft: "0px",
            paddingRight: "0px",
          },
        },
        "& .swiper-wrapper": {
          display: "flex",
        },
        "& .swiper-slide": {
          [theme.breakpoints.up("sm")]: {
            width: "calc(33.33% - 22px) !important",
            marginRight: "32px",
          },
          [theme.breakpoints.up("md")]: {
            width: "calc(33.33% - 43px) !important",
            marginRight: "64px",
          },
        },
      })}
    >
      <Swiper
        key={searchParams.get("status") || "all"}
        modules={[Pagination, A11y]}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={32}
        breakpoints={{
          [theme.breakpoints.values.xs]: {
            slidesPerView: 1,
            spaceBetween: 32,
          },
          [theme.breakpoints.values.sm]: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          [theme.breakpoints.values.md]: {
            slidesPerView: 3,
            spaceBetween: 64,
          },
        }}
      >
        {characters.map((character) => (
          <SwiperSlide
            key={character.id}
            style={{
              width: "100%",
            }}
          >
            <Link href={`/characters/${character.id}`}>
              <CharacterItem character={character} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        className="custom-pagination"
        sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
      ></Box>
    </Container>
  );
};
