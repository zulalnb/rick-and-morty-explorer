"use client";

import Link from "next/link";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";

export const FilterButton = ({
  isActive = false,
  iconColor,
  href,
  title,
}: {
  isActive?: boolean;
  iconColor: "error" | "success" | "disabled";
  href: string;
  title: string;
}) => {
  return (
    <Button
      component={Link}
      href={href}
      startIcon={<CircleIcon color={iconColor} />}
      variant="outlined"
      color="inherit"
      sx={{
        textTransform: "capitalize",
        width: 120,
        height: 36,
        minWidth: 120,
        border: isActive ? "5px solid #02afc5" : "1px solid #000",
      }}
    >
      {title}
    </Button>
  );
};
