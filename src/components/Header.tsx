import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
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
  );
};
