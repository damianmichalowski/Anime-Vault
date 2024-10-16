"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchAnime = async (
	page: number,
	filter?: string,
	order?: string
) => {
	const url = `https://shikimori.one/api/animes?page=${page}&limit=8&search=${filter}&order=${order}`;

	console.log(url);

	const response = await fetch(url);

	const data: AnimeProp[] = await response.json();

	//console.log(data);
	return data;
};
