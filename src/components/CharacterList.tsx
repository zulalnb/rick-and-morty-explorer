"use client";

import { useSearchParams } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { CharacterItem } from "./CharacterItem";
import { Character } from "@/types/character";

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
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const swiperPadding = isSmUp ? "0px" : "16px";

  return (
    <Container
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          paddingX: 0,
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
        style={{ paddingLeft: swiperPadding, paddingRight: swiperPadding }}
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
            <CharacterItem character={character} />
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
