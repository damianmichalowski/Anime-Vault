"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

function LoadMore({ filter, order }: { filter: string; order: string }) {
	const { ref, inView } = useInView();
	const [data, setData] = useState<AnimeProp[]>([]);

	useEffect(() => {
		if (inView) {
			fetchAnime(page, filter, order)
				.then((res) => {
					setData([...data, ...res]);
					page++;
				})
				.catch((error) => {
					console.error("Error fetching anime:", error);
				});
		}
	}, [inView, data]);

	useEffect(() => {
		page = 2;
		setData([]);
	}, [filter, order]);

	return (
		<>
			{data.length !== 0 && (
				<>
					<section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
						{data.map((item: AnimeProp, index: number) => (
							<AnimeCard anime={item} key={index} index={index} />
						))}
					</section>
				</>
			)}
			<section className="flex justify-center items-center w-full">
				<div ref={ref}>
					<Image
						src="./spinner.svg"
						alt="spinner"
						width={56}
						height={56}
						className="object-contain"
					/>
				</div>
			</section>
		</>
	);
}

export default LoadMore;
