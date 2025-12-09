import { fetchRandomGif } from "@/services/giphy";

describe("Giphy API", () => {
	it("fetches random gif", async () => {
		const gif = await fetchRandomGif();
		expect(gif.id).toBeDefined();
	});
});
