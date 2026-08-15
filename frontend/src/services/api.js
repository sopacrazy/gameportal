import { fallbackGames } from "../data/games";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error("Falha ao carregar dados da API.");
  }

  return response.json();
}

export async function fetchGames() {
  try {
    return await request("/games");
  } catch (error) {
    console.warn(error.message);
    return fallbackGames;
  }
}

export async function fetchGameBySlug(slug) {
  try {
    return await request(`/games/${slug}`);
  } catch (error) {
    console.warn(error.message);
    return fallbackGames.find((game) => game.slug === slug);
  }
}

export async function searchGames(query) {
  try {
    return await request(`/search?q=${encodeURIComponent(query)}`);
  } catch (error) {
    console.warn(error.message);
    const normalizedQuery = query.trim().toLowerCase();
    return fallbackGames.filter((game) => {
      return (
        game.title.toLowerCase().includes(normalizedQuery) ||
        game.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }
}
