import type { MetadataRoute } from "next";
import { BASE_API_URL, BASE_URL } from "@/lib/constants";
import { paginateItems } from "@/lib/utils";
import { Location, LocationAPIResponse } from "@/types/location";
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
  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/favorites/`, lastModified: new Date() },
  ];

  const firstLocationPage = await fetch(`${BASE_API_URL}/location`).then(
    (res) => res.json() as Promise<LocationAPIResponse>
  );

  const totalLocationPages = firstLocationPage.info.pages;
  const locationListPages = Array.from(
    { length: totalLocationPages - 1 },
    (_, i) => ({
      url: `${BASE_URL}/page/${i + 2}/`,
      lastModified: new Date(),
    })
  );

  const allLocations = await fetchAll<Location>(`${BASE_API_URL}/location`);
  const locationRoutes = allLocations.flatMap((location) => {
    const routes = [
      {
        url: `${BASE_URL}/locations/${location.id}/characters/`,
        lastModified: new Date(location.created),
      },
    ];

    const characterCount = location.residents.length;
    if (characterCount > 0) {
      const { totalPages } = paginateItems(location.residents);
      for (let i = 2; i <= totalPages; i++) {
        routes.push({
          url: `${BASE_URL}/locations/${location.id}/characters/page/${i}/`,
          lastModified: new Date(location.created),
        });
      }
    }
    return routes;
  });

  const allCharacters = await fetchAll<Character>(`${BASE_API_URL}/character`);
  const characterRoutes = allCharacters.map((character) => ({
    url: `${BASE_URL}/characters/${character.id}/`,
    lastModified: new Date(character.created),
  }));

  return [
    ...staticRoutes,
    ...locationListPages,
    ...locationRoutes,
    ...characterRoutes,
  ];
}
