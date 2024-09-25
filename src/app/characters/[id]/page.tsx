import Image from "next/image";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { Character } from "@/types/character";
import { Location } from "@/types/location";

const getLocation = async (url: string): Promise<Location> => {
  const res = await fetch(url);
  const data: Location = await res.json();
  return data;
};

const getCharacterDetail = async (id: number): Promise<Character> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/character/${id}`
  );
  const data: Character = await res.json();
  return data;
};

export default async function Page({ params }: { params: { id: number } }) {
  const character = await getCharacterDetail(params.id);
  const location = character
    ? await getLocation(character.location.url)
    : { dimension: "" };

  return (
    <main>
      <Container component={"main"} sx={{ marginY: 4 }}>
        <Grid container spacing={{ xs: 6, md: 8 }}>
          {character && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ position: "relative", aspectRatio: 1 / 1 }}>
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontWeight: "bold", color: "gray", fontSize: 28 }}
                  >
                    {character.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircleIcon
                      color={
                        character.status === "Dead"
                          ? "error"
                          : character.status === "Alive"
                          ? "success"
                          : "disabled"
                      }
                    />
                    <Typography sx={{ fontSize: 18 }}>
                      {character.status} - {character.species}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontStyle: "italic", fontSize: 18 }}>
                    {location.dimension}
                  </Typography>
                </Box>
                <Typography sx={{ fontStyle: "italic" }}>
                  {character.type || "-"} / {character.gender}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </main>
  );
}
