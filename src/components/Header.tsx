"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { normalizePath } from "@/lib/utils";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const basePath = normalizePath(pathname);

  return (
    <Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        {basePath !== "/" && (
          <IconButton
            onClick={() => router.back()}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              color: "black",
              border: "2px solid black",
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="rick and morty"
            priority
            width={210}
            height={100}
          />
        </Link>
      </Box>
    </Container>
  );
};
