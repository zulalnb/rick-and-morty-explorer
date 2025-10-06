"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { type Theme } from "@mui/material";
import MUIPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { normalizePath } from "@/lib/utils";

const PaginationContent = ({
  count,
  currentPage,
}: {
  count: number;
  currentPage: number;
}) => {
  const pathname = usePathname();
  const basePath = normalizePath(pathname);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <MUIPagination
      sx={(theme: Theme) => ({
        mt: 12,
        mb: 2,
        [theme.breakpoints.up("md")]: {
          mt: 8,
        },
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
      })}
      count={count}
      page={currentPage}
      renderItem={(item) => {
        const base =
          basePath === "/"
            ? `/page/${item.page}`
            : `${basePath}/page/${item.page}`;
        const href = status ? `${base}/?status=${status}` : base;
        return (
          <PaginationItem
            component={item.page === currentPage ? "span" : Link}
            href={href}
            {...item}
          />
        );
      }}
    />
  );
};

export const Pagination = (props: { count: number; currentPage: number }) => (
  <Suspense fallback={null}>
    <PaginationContent {...props} />
  </Suspense>
);
