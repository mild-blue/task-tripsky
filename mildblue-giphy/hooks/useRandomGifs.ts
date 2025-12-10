import { useEffect, useState } from "react";
import { fetchRandomGif } from "@/services/giphy";
import { IGif } from "@/utils/types";

export function useRandomGif(searchTerm: string) {
	const [gif, setGif] = useState<IGif | null>(null);
	const isIdle = searchTerm.length < 2;

	useEffect(() => {
		if (!isIdle) return;

		let interval: NodeJS.Timeout;

		async function loadGif() {
			const data = await fetchRandomGif();
			setGif(data);
		}

		loadGif();
		interval = setInterval(loadGif, 10000);

		return () => clearInterval(interval);
	}, [isIdle]);

	return gif;
}
