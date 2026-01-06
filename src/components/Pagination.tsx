"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import MUIPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const PaginationContent = ({
  count,
  currentPage,
}: {
  count: number;
  currentPage: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <MUIPagination
      sx={(theme) => ({
        mt: 6,
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
        let href: string;
        if (pathname.includes("characters")) {
          const params = new URLSearchParams();
          const status = searchParams.get("status");
          if (status) {
            params.set("status", status);
          }
          if (item.page !== 1) {
            params.set("page", String(item.page));
          }
          const query = params.toString();
          href = query ? `${pathname}?${query}` : pathname;
        } else {
          href = item.page === 1 ? "/" : `/page/${item.page}`;
        }

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
  <PaginationContent {...props} />
);
