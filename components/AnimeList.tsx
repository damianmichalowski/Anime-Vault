"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BugIcon, SearchIcon } from "lucide-react";
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import LoadMore from "../components/LoadMore";
import { ChangeEvent, FormEvent, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface AnimeListProps {
	data: AnimeProp[];
	onFiltersChanged: () => void;
	setFilter: (filter: string) => void;
	filter: string;
	order: string;
	setOrder: (order: string) => void;
}

const AnimeList = ({
	data,
	filter,
	order,
	setOrder,
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

	const handleSelectChange = (value: string) => {
		setOrder(value);
	};

	return (
		<>
			<form onSubmit={handleSumbit} className="flex gap-4">
				<Input
					placeholder="Type a title here..."
					onChange={handleInputChange}
					value={filter}
				/>
				<Select
					value={order}
					defaultValue="popularity"
					onValueChange={handleSelectChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Theme" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="ranked">ranked</SelectItem>
						<SelectItem value="kind">kind</SelectItem>
						<SelectItem value="popularity">popularity</SelectItem>
						<SelectItem value="name">name</SelectItem>
						<SelectItem value="aired_on">By release date</SelectItem>
						<SelectItem value="episodes">episodes</SelectItem>
						<SelectItem value="status">status</SelectItem>
						<SelectItem value="random">random</SelectItem>
					</SelectContent>
				</Select>

				<Button type="submit" className="flex gap-1">
					<SearchIcon className="w-5 h-5" />
					Search
				</Button>
			</form>
			<h2 className="text-3xl text-white font-bold">Explore Anime</h2>
			{data.length !== 0 ? (
				<>
					<section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
						{data.map((item: AnimeProp, index: number) => (
							<AnimeCard anime={item} key={index} index={index} />
						))}
					</section>
					<LoadMore filter={filter} order={order} />
				</>
			) : (
				<div className="flex items-center justify-center gap-4">
					<p>Nothing to see here bro </p>
					<BugIcon />
				</div>
			)}
		</>
	);
};

export default AnimeList;
