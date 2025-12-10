export enum GiphyRating {
	Y = "y",
	G = "g",
	PG = "pg",
	PG13 = "pg-13",
	R = "r",
	NSFW = "nsfw",
	Unrated = "unrated",
}

export const GiphyRatingMinAge: Record<GiphyRating, number> = {
	[GiphyRating.Y]: 0,
	[GiphyRating.G]: 0,
	[GiphyRating.PG]: 10,
	[GiphyRating.PG13]: 13,
	[GiphyRating.R]: 17,
	[GiphyRating.NSFW]: 18,
	[GiphyRating.Unrated]: 18,
};

export function getMinAgeForGiphyRating(rating: string): number {
	const normalized = rating.toLowerCase() as GiphyRating;
	return GiphyRatingMinAge[normalized] ?? 18; // fallback for unknown ratings
}
