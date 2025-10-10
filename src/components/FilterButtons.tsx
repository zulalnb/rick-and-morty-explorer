"use client";

import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FilterButton } from "./FilterButton";

const STATUS_FILTERS = [
  { key: "dead", color: "error", label: "Dead" },
  { key: "alive", color: "success", label: "Alive" },
  { key: "unknown", color: "disabled", label: "Unknown" },
] as const;

export const FilterButtons = ({ locationId }: { locationId: number }) => {
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  return (
    <Container
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          paddingX: 0,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          marginBottom: 3,
          display: "flex",
          gap: 2,
          whiteSpace: "nowrap",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          [theme.breakpoints.down("sm")]: {
            paddingX: 2,
          },
        })}
      >
        {STATUS_FILTERS.map((status) => (
          <FilterButton
            key={status.key}
            href={
              activeStatus === status.key
                ? `/locations/${locationId}/characters`
                : `/locations/${locationId}/characters/?status=${status.key}`
            }
            title={status.label}
            iconColor={status.color}
            isActive={activeStatus === status.key}
          />
        ))}
      </Box>
    </Container>
  );
};
