import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Character } from "@/types/api/character";
import { Location } from "@/types/api/location";
import { getRandomItems } from "@/lib/utils";
import { BASE_API_URL } from "@/lib/constants";
import { CharacterItem } from "@/components/CharacterItem";
import { CharacterImageWrapper } from "@/components/CharacterImageWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

const getLocation = async (url: string): Promise<Location> => {
  const res = await fetch(url);
  const data: Location = await res.json();
  return data;
};

const getCharacterDetail = async (id: number): Promise<Character | null> => {
  const res = await fetch(`${BASE_API_URL}/character/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};

const getOtherCharacters = async (
  characterIds: number[],
  status: string
): Promise<Character[]> => {
  const res = await fetch(`${BASE_API_URL}/character/${characterIds}`);
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

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const character = await getCharacterDetail(Number(params.id));
  const previousOpenGraph = (await parent).openGraph || {};

  if (!character) {
    return {
      title: "Page Not Found (404)",
      robots: { index: false, follow: false },
    };
  }

  const description = `Uncover the full story of ${character.name}, a ${character.species} from the Rick and Morty universe. Explore their origin, current status, and last known location.`;

  const canonicalPath = `/characters/${params.id}`;

  return {
    title: character.name,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      ...previousOpenGraph,
      title: `${character.name} | Rick and Morty Explorer`,
      description,
      images: [
        {
          url: character.image,
          width: 300,
          height: 300,
          alt: `${character.name} character portrait`,
        },
      ],
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title: `${character.name} | Rick and Morty Explorer`,
      description,
      images: [character.image],
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const id = Number(params.id);
  const character = await getCharacterDetail(id);

  if (!character) {
    return notFound();
  }

  const location = await getLocation(character.location.url);

  const characterIds = character
    ? location.residents
        .filter((resident) => {
          const parts = resident.split("/");
          return parseInt(parts[parts.length - 1], 10) !== id;
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
    <Container component="main" sx={{ marginY: 4 }}>
      <Grid container spacing={{ xs: 6, md: 8 }}>
        {character && (
          <Grid size={{ xs: 12, md: 6 }}>
            <CharacterItem character={character} isDetail />
          </Grid>
        )}
        {otherCharacters.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
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
                    <Box sx={{ width: "20%" }}>
                      <CharacterImageWrapper
                        src={character.image}
                        alt={character.name}
                        priority
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
  );
}
