import type { MetadataRoute } from "next";
import { BASE_API_URL, BASE_URL } from "@/lib/constants";
import { Location } from "@/types/location";
import { Character } from "@/types/character";

async function fetchAll<T>(apiUrl: string): Promise<T[]> {
  let allResults: T[] = [];
  let nextPage: string | null = apiUrl;

  while (nextPage) {
    try {
      const res: Response = await fetch(nextPage);
      if (!res.ok) {
        console.error(`Failed to fetch ${nextPage}: ${res.statusText}`);
        break;
      }
      const data = await res.json();
      allResults = allResults.concat(data.results);
      nextPage = data.info.next;
    } catch (error) {
      console.error("Error fetching API data:", error);
      break;
    }
  }
  return allResults;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [{ url: `${BASE_URL}/`, lastModified: new Date() }];

  const allLocations = await fetchAll<Location>(`${BASE_API_URL}/location`);
  const locationRoutes = allLocations.map((location) => ({
    url: `${BASE_URL}/locations/${location.id}/characters/`,
    lastModified: new Date(location.created),
  }));

  const allCharacters = await fetchAll<Character>(`${BASE_API_URL}/character`);
  const characterRoutes = allCharacters.map((character) => ({
    url: `${BASE_URL}/characters/${character.id}/`,
    lastModified: new Date(character.created),
  }));

  return [...staticRoutes, ...locationRoutes, ...characterRoutes];
}
