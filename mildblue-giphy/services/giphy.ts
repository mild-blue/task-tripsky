import axios from "axios";

export const GIPHY_API_KEY = "PlTvthVMkqTk3ZueRiHpXa6uR1zDNanJ";

const api = axios.create({
	baseURL: "https://api.giphy.com/v1/gifs",
});

export async function fetchRandomGif() {
	const res = await api.get("/random", {
		params: { api_key: GIPHY_API_KEY },
	});

	console.log("Fetched random GIF:", res.data);
	return res.data.data;
}

export async function fetchGifById(id: string) {
	const res = await api.get(`/${id}`, {
		params: { api_key: GIPHY_API_KEY },
	});
	return res.data.data;
}

export async function searchGifs(query: string) {
	const res = await api.get("/search", {
		params: { api_key: GIPHY_API_KEY, q: query, limit: 20 },
	});
	return res.data.data;
}
