"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Location } from "@/types/location";

const StyledTableCell = styled(TableCell)({
  padding: "8px 12px",
});

const StyledTableHead = styled(StyledTableCell)({
  width: "30%",
  fontWeight: "bold",
});

export const LocationItem = ({ location }: { location: Location }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Stack
        sx={{
          border: "1px solid black",
          flexDirection: "row",
          borderRadius: 4,
          padding: 2,
        }}
      >
        <Table sx={{ "th, td": { border: 0 } }}>
          <TableRow>
            <StyledTableHead component="th" scope="row">
              Name:
            </StyledTableHead>
            <StyledTableCell>{location.name}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead component="th" scope="row">
              Type:
            </StyledTableHead>
            <StyledTableCell>{location.type}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead component="th" scope="row">
              Dimension:
            </StyledTableHead>
            <StyledTableCell>{location.dimension || "-"}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableHead component="th" scope="row">
              Resident count:
            </StyledTableHead>
            <StyledTableCell>{location.residents.length}</StyledTableCell>
          </TableRow>
        </Table>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "flex-end",
            marginLeft: 2,
          }}
        >
          <Link href={`/locations/${location.id}/characters`}>
            <ArrowForwardIosIcon />
          </Link>
        </Box>
      </Stack>
    </Grid>
  );
};
