import { getMinAgeForGiphyRating } from "@/utils/ratingFilter";

describe("getMinAgeForGiphyRating", () => {
	it.each([
		["y", 0],
		["Y", 0],
		["g", 0],
		["pg", 10],
		["pg-13", 13],
		["r", 17],
		["nsfw", 18],
		["unrated", 18],
	])("returns %d for rating %s", (rating, expected) => {
		expect(getMinAgeForGiphyRating(rating)).toBe(expected);
	});

	it("falls back to 18 for unknown ratings", () => {
		expect(getMinAgeForGiphyRating("mystery" as never)).toBe(18);
	});
});
