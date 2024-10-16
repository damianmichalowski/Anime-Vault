"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BugIcon, SearchIcon } from "lucide-react";
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import LoadMore from "../components/LoadMore";
import { ChangeEvent, FormEvent, useState } from "react";

interface AnimeListProps {
	data: AnimeProp[];
	onFiltersChanged: () => void;
	setFilter: (filter: string) => void;
	filter: string;
}

const AnimeList = ({
	data,
	filter,
	setFilter,
	onFiltersChanged,
}: AnimeListProps) => {
	// const [searchValue, setSearchValue] = useState("");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		// setSearchValue(e.target.value);
		setFilter(e.target.value);
		console.log(filter);
	};

	const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onFiltersChanged();
	};

	return (
		<>
			<form onSubmit={handleSumbit} className="flex gap-4">
				<Input
					placeholder="Type a title here..."
					onChange={handleInputChange}
					value={filter}
				/>
				<Button type="submit" className="flex gap-1">
					<SearchIcon className="w-5 h-5" />
					Search
				</Button>
			</form>
			<h2 className="text-3xl text-white font-bold">Explore Anime</h2>
			{data.length !== 0 ? (
				<section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
					{data.map((item: AnimeProp, index: number) => (
						<AnimeCard anime={item} key={index} index={index} />
					))}
				</section>
			) : (
				<div className="flex items-center justify-center gap-4">
					<p>Nothing to see here bro </p>
					<BugIcon />
				</div>
			)}

			<LoadMore filter={filter} />
		</>
	);
};

export default AnimeList;
