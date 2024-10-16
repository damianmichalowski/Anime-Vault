"use client";

import AnimeList from "@/components/AnimeList";
import { fetchAnime } from "./action";
import { AnimeProp } from "@/components/AnimeCard";
import { useEffect, useState } from "react";

function Home() {
	const [data, setData] = useState<AnimeProp[]>([]);
	const [filter, setFilter] = useState("");
	const [order, setOrder] = useState("popularity");

	useEffect(() => {
		const timer = setTimeout(() => {
			handleFiltersChanged();
		}, 300);

		return () => clearTimeout(timer);
	}, [filter, order]);

	const fetchData = (filter?: string, order?: string) => {
		console.log("Filter", filter, "Order", order);
		fetchAnime(1, filter, order)
			.then((data) => {
				setData(data);
				console.log(data);
			})
			.catch((error) => {
				console.error("Error fetching anime:", error);
			});
	};

	const handleFiltersChanged = () => {
		fetchData(filter, order);
	};

	useEffect(() => {
		fetchData(filter, order);
	}, []);

	return (
		<main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
			<AnimeList
				data={data}
				filter={filter}
				setFilter={setFilter}
				order={order}
				setOrder={setOrder}
				onFiltersChanged={handleFiltersChanged}
			/>
		</main>
	);
}

export default Home;
