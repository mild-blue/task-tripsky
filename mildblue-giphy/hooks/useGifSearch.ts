import { useQuery } from "@tanstack/react-query";
import { searchGifs } from "@/services/giphy";

export function useGifSearch(query: string) {
	return useQuery({
		queryKey: ["search", query],
		queryFn: () => searchGifs(query),
		enabled: query.length >= 2,
	});
}
