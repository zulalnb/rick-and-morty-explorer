"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        {pathname !== "/" && pathname !== "/locations/page/1" && (
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
            src="https://logos-world.net/wp-content/uploads/2022/01/Rick-And-Morty-Symbol.png}"
            alt="rick and morty"
            priority
            width={280}
            height={120}
          />
        </Link>
      </Box>
    </Container>
  );
};
