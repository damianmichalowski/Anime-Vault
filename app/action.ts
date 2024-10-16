"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchAnime = async (page: number, filter?: string) => {
	
	const url = filter ? `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity&search=${filter}` : `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`

	const response = await fetch(url);

	const data: AnimeProp[] = await response.json();

	console.log(data);
	return data;
};
