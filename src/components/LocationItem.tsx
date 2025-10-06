"use client";

import Link from "next/link";
import Grid, { type GridProps } from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Location } from "@/types/location";
interface LocationItemProps extends GridProps {
  location: Location;
}

export const LocationItem = ({ location, ...props }: LocationItemProps) => {
  return (
    <Grid size={{ xs: 12, md: 6 }} {...props}>
      <Link href={`/locations/${location.id}/characters`}>
        <Stack
          sx={{
            border: "1px solid black",
            flexDirection: "row",
            borderRadius: 8,
            padding: "8px 20px",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: 1,
              }}
            >
              <Typography fontWeight="bold" sx={{ flex: 2, minWidth: 82 }}>
                Name:
              </Typography>
              <Typography
                sx={{
                  flex: 3,
                }}
              >
                {location.name || "-"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: 1,
              }}
            >
              <Typography fontWeight="bold" sx={{ flex: 2, minWidth: 82 }}>
                Type:
              </Typography>
              <Typography
                sx={{
                  flex: 3,
                }}
              >
                {location.type || "-"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: 1,
              }}
            >
              <Typography fontWeight="bold" sx={{ flex: 2, minWidth: 82 }}>
                Dimension:
              </Typography>
              <Typography
                sx={{
                  flex: 3,
                }}
              >
                {location.dimension || "-"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: 1,
              }}
            >
              <Typography fontWeight="bold" sx={{ flex: 2, minWidth: 82 }}>
                Resident count:
              </Typography>
              <Typography
                sx={{
                  flex: 3,
                }}
              >
                {location.residents.length}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              alignSelf: "center",
              marginLeft: { xs: 0.5, sm: 2 },
            }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </Box>
        </Stack>
      </Link>
    </Grid>
  );
};
