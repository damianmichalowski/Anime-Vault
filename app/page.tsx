"use client"

import AnimeList from "@/components/AnimeList";
import { fetchAnime } from "./action";
import { AnimeProp } from "@/components/AnimeCard";
import { useEffect, useState } from "react";

function Home() {

	const [data, setData] = useState<AnimeProp[]>([])
	const [filter, setFilter] = useState("")

	const fetchData = (filter?: string) => {
		fetchAnime(1, filter).then((data) => {
			setData(data);
		}).catch((error) => {
			console.error("Error fetching anime:", error);
		});
	};

	const handleFiltersChanged = () => {
		fetchData(filter);
	}

	useEffect(() => {
		fetchData()
	}, [])
	
	return (
		<main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
			<AnimeList data={data} filter={filter} setFilter={setFilter} onFiltersChanged={handleFiltersChanged} />
		</main>
	);
}

export default Home;
