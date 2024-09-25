import Image from "next/image";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { Character } from "@/types/character";
import { Location } from "@/types/location";
import { getRandomItems } from "@/lib/utils";
import Link from "next/link";

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

const getOtherCharacters = async (
  characterIds: number[],
  status: string
): Promise<Character[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/character/${characterIds}`
  );
  const characters: Character[] = await res.json();
  const filteredCharacters = characters.filter(
    (character) => character.status === status
  );
  const otherCharacters: Character[] =
    filteredCharacters.length > 2
      ? getRandomItems(filteredCharacters)
      : filteredCharacters;

  return otherCharacters;
};

export default async function Page({ params }: { params: { id: number } }) {
  const character = await getCharacterDetail(params.id);
  const location = character
    ? await getLocation(character.location.url)
    : { residents: [], dimension: "" };

  const characterIds = character
    ? location.residents
        .filter((resident) => {
          const parts = resident.split("/");
          return parseInt(parts[parts.length - 1], 10) !== Number(params.id);
        })
        .map((resident) => {
          const parts = resident.split("/");
          return parseInt(parts[parts.length - 1], 10);
        })
    : [];

  const otherCharacters = await getOtherCharacters(
    characterIds,
    character.status
  );

  return (
    <main>
      <Container sx={{ marginY: 4 }}>
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
                    {character.location.name}
                  </Typography>
                </Box>
                <Typography sx={{ fontStyle: "italic" }}>
                  {character.type || "-"} / {character.gender}
                </Typography>
              </Box>
            </Grid>
          )}
          {otherCharacters.length > 0 && (
            <Grid size={6}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: 24, mb: 4 }}>
                  Other Characters
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {otherCharacters.map((character) => (
                    <Box
                      component={Link}
                      href={`/characters/${character.id}`}
                      key={character.id}
                      sx={{ display: "flex", gap: 2 }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          aspectRatio: 1 / 1,
                          width: "20%",
                        }}
                      >
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
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "gray",
                            fontSize: 24,
                          }}
                        >
                          {character.name}
                        </Typography>
                        <Typography sx={{ fontStyle: "italic", fontSize: 18 }}>
                          {character.location.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontStyle: "italic",
                            marginTop: "auto",
                            marginBottom: 0,
                          }}
                        >
                          {character.type || "-"} / {character.gender}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </main>
  );
}
