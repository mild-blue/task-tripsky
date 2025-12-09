import { useEffect, useState } from "react";
import { fetchRandomGif } from "@/services/giphy";
import { IGif } from "@/utils/types";

export function useRandomGif(searchTerm: string) {
	const [gif, setGif] = useState<IGif | null>(null);

	useEffect(() => {
		if (searchTerm.length >= 2) return;

		let interval: NodeJS.Timeout;

		async function loadGif() {
			const data = await fetchRandomGif();
			setGif(data);
		}

		loadGif();
		interval = setInterval(loadGif, 10000);

		return () => clearInterval(interval);
	}, [searchTerm]);

	return gif;
}
