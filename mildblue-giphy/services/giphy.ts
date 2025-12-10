import axios from "axios";

export const GIPHY_API_KEY = "PlTvthVMkqTk3ZueRiHpXa6uR1zDNanJ";

export const giphyApi = axios.create({
	baseURL: "https://api.giphy.com/v1/gifs",
});

export async function fetchRandomGif() {
	const res = await giphyApi.get("/random", {
		params: { api_key: GIPHY_API_KEY },
	});

	return res.data.data;
}

export async function fetchGifById(id: string) {
	const res = await giphyApi.get(`/${id}`, {
		params: { api_key: GIPHY_API_KEY },
	});
	return res.data.data;
}

export async function searchGifs(query: string) {
	const res = await giphyApi.get("/search", {
		params: { api_key: GIPHY_API_KEY, q: query, limit: 15 },
	});
	return res.data.data;
}
