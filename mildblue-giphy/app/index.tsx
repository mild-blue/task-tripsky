import { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SearchBar } from "@/components/SearchBar";
import { GifCard } from "@/components/GifCard";
import { GifImage } from "@/components/GifImage";
import { useGifSearch } from "@/hooks/useGifSearch";
import { useRandomGif } from "@/hooks/useRandomGifs";

export default function HomeScreen() {
	const router = useRouter();
	const { q } = useLocalSearchParams<{ q?: string }>();
	const [searchTerm, setSearchTermState] = useState<string>(() =>
		typeof q === "string" ? q : ""
	);

	function updateSearchTerm(value: string) {
		setSearchTermState(value);
		router.setParams(value ? { q: value } : { q: "" });
	}

	useEffect(() => {
		const next = typeof q === "string" ? q : "";
		if (next !== searchTerm) {
			setSearchTermState(next);
		}
	}, [q, searchTerm]);

	const randomGif = useRandomGif(searchTerm);
	const { data: results } = useGifSearch(searchTerm);

	const isSearching = searchTerm.length >= 2 && results;

	return (
		<View style={{ flex: 1 }}>
			<SearchBar
				value={searchTerm}
				onChange={updateSearchTerm}
				onCancel={() => updateSearchTerm("")}
			/>

			{isSearching ? (
				<FlatList
					data={results}
					keyExtractor={(item) => item.id}
					numColumns={3}
					columnWrapperStyle={styles.column}
					contentContainerStyle={styles.listContent}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.tile}
							onPress={() =>
								router.push({
									pathname: "/detail/[id]",
									params: {
										id: item.id,
										q: searchTerm || undefined,
									},
								})
							}
						>
							<GifImage
								url={item.images.fixed_width_small.url}
								style={styles.tileImage}
							/>
						</TouchableOpacity>
					)}
				/>
			) : randomGif ? (
				<View style={{ padding: 20 }}>
					<GifCard gif={randomGif} />
				</View>
			) : (
				<Text style={{ padding: 20 }}>Loading...</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 80,
	},
	column: {
		justifyContent: "space-between",
	},
	tile: {
		flex: 1,
		borderRadius: 14,
		overflow: "hidden",
		marginBottom: 12,
		marginHorizontal: 6,
	},
	tileImage: {
		height: 140,
	},
});
