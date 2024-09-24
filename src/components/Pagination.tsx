"use client";

import Link from "next/link";
import MUIPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

export const Pagination = ({
  count,
  currentPage,
}: {
  count: number;
  currentPage: number;
}) => {
  return (
    <MUIPagination
      sx={{
        mt: 12,
        "& .MuiPagination-ul": { justifyContent: "center" },
        "& .Mui-selected": {
          color: "white",
          backgroundColor: "black !important",
          userSelect: "text",

          "&:hover": {
            color: "white",
            backgroundColor: "black",
            cursor: "text",
          },
        },
      }}
      count={count}
      page={currentPage}
      renderItem={(item) => {
        return (
          <PaginationItem
            component={item.page === currentPage ? "span" : Link}
            href={`/locations/page/${item.page}`}
            {...item}
          />
        );
      }}
    />
  );
};
