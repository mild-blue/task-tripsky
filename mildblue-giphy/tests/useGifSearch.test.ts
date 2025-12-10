import { useGifSearch } from "@/hooks/useGifSearch";
import { searchGifs } from "@/services/giphy";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
	useQuery: jest.fn(),
}));

jest.mock("@/services/giphy", () => ({
	searchGifs: jest.fn(() => Promise.resolve([])),
}));

const mockedUseQuery = useQuery as jest.Mock;
const mockedSearchGifs = searchGifs as jest.Mock;

describe("useGifSearch", () => {
	beforeEach(() => {
		mockedUseQuery.mockReset();
		mockedSearchGifs.mockClear();
	});

	it("disables the query when the term is too short", () => {
		mockedUseQuery.mockReturnValue({ data: null });

		useGifSearch("a");

		expect(mockedUseQuery).toHaveBeenCalledWith(
			expect.objectContaining({
				queryKey: ["search", "a"],
				enabled: false,
			})
		);

		const callArgs = mockedUseQuery.mock.calls[0][0];
		callArgs.queryFn();
		expect(mockedSearchGifs).toHaveBeenCalledWith("a");
	});

	it("enables the query once the minimum length is met", () => {
		mockedUseQuery.mockReturnValue({ data: [] });

		useGifSearch("cats");

		expect(mockedUseQuery).toHaveBeenCalledWith(
			expect.objectContaining({
				queryKey: ["search", "cats"],
				enabled: true,
			})
		);
	});
});
