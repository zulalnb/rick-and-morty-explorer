import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Character } from "@/types/character";
import { Location } from "@/types/location";
import { getRandomItems } from "@/lib/utils";
import { CharacterItem } from "@/components/CharacterItem";

const getLocation = async (url: string): Promise<Location> => {
  const res = await fetch(url);
  const data: Location = await res.json();
  return data;
};

const getCharacterDetail = async (id: number): Promise<Character> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/character/${id}`
  );
  if (!res.ok) {
    notFound();
  }
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
  const data: Character[] = await res.json();
  const characters: Character[] = Array.isArray(data) ? data : [data];
  const filteredCharacters = characters.filter(
    (character) => character.status === status
  );
  const otherCharacters: Character[] =
    filteredCharacters.length > 2
      ? getRandomItems(filteredCharacters)
      : filteredCharacters;

  return otherCharacters;
};

export async function generateMetadata({ params }: { params: { id: number } }) {
  const character = await getCharacterDetail(params.id);

  return {
    title: character.name,
    description: `Explore details about ${character.name}, a character from the Rick and Morty universe. Learn about his species, origin, location.`,
    openGraph: {
      title: `${character.name} | Rick and Morty Explorer`,
      description: `Explore details about ${character.name}, a character from the Rick and Morty universe. Learn about his species, origin, location.`,
      type: "website",
      images: [character.image],
    },
  };
}

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
          {character && <CharacterItem character={character} isDetail />}
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
                          priority
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
