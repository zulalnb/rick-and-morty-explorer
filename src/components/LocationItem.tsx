"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Location } from "@/types/location";

const StyledTableCell = styled(TableCell)({
  padding: "8px 12px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const StyledTableHead = styled(StyledTableCell)(({ theme }) => ({
  width: "40%",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    width: "30%",
  },
}));

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
        <Box sx={{ flexGrow: 3, overflow: "hidden" }}>
          <Table sx={{ "th, td": { border: 0 } }}>
            <TableBody>
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
            </TableBody>
          </Table>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "flex-end",
            marginLeft: 2,
            // width: "10%",
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
