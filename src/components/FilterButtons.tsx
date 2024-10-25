"use client";

import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";
import { FilterButton } from "./FilterButton";

export const FilterButtons = ({ locationId }: { locationId: number }) => {
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  return (
    <Container
      sx={(theme: Theme) => ({
        [theme.breakpoints.down("sm")]: {
          paddingX: 0,
        },
      })}
    >
      <Box
        sx={(theme: Theme) => ({
          marginBottom: 3,
          display: "flex",
          gap: 2,
          whiteSpace: "nowrap",
          overflowX: "scroll",
          WebkitOverflowScrolling: "touch",
          [theme.breakpoints.down("sm")]: {
            paddingX: 2,
          },
        })}
      >
        <FilterButton
          href={
            activeStatus === "dead"
              ? `/locations/${locationId}/characters`
              : `/locations/${locationId}/characters/?status=dead`
          }
          title="Dead"
          iconColor="error"
          isActive={activeStatus === "dead"}
        />
        <FilterButton
          href={
            activeStatus === "alive"
              ? `/locations/${locationId}/characters`
              : `/locations/${locationId}/characters/?status=alive`
          }
          title="Alive"
          iconColor="success"
          isActive={activeStatus === "alive"}
        />
        <FilterButton
          href={
            activeStatus === "unknown"
              ? `/locations/${locationId}/characters`
              : `/locations/${locationId}/characters/?status=unknown`
          }
          title="Unknown"
          iconColor="disabled"
          isActive={activeStatus === "unknown"}
        />
      </Box>
    </Container>
  );
};
