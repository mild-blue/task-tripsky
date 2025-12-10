import {
	fetchGifById,
	fetchRandomGif,
	searchGifs,
	GIPHY_API_KEY,
	giphyApi,
} from "@/services/giphy";

const mockGet = jest.spyOn(giphyApi, "get");

describe("giphy service", () => {
	beforeEach(() => {
		mockGet.mockReset();
	});

	it("fetches a random gif with API key", async () => {
		const payload = { id: "random-1" };
		mockGet.mockResolvedValueOnce({ data: { data: payload } } as never);

		const data = await fetchRandomGif();

		expect(mockGet).toHaveBeenCalledWith("/random", {
			params: { api_key: GIPHY_API_KEY },
		});
		expect(data).toEqual(payload);
	});

	it("fetches gif by id", async () => {
		const payload = { id: "abc" };
		mockGet.mockResolvedValueOnce({ data: { data: payload } } as never);

		const data = await fetchGifById("abc");

		expect(mockGet).toHaveBeenCalledWith("/abc", {
			params: { api_key: GIPHY_API_KEY },
		});
		expect(data).toEqual(payload);
	});

	it("searches gifs with limit", async () => {
		const payload = [{ id: "1" }];
		mockGet.mockResolvedValueOnce({ data: { data: payload } } as never);

		const data = await searchGifs("cat");

		expect(mockGet).toHaveBeenCalledWith("/search", {
			params: { api_key: GIPHY_API_KEY, q: "cat", limit: 15 },
		});
		expect(data).toEqual(payload);
	});
});
