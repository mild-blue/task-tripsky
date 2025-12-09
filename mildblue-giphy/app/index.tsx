import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { SearchBar } from "@/components/SearchBar";
import { GifCard } from "@/components/GifCard";
import { useGifSearch } from "@/hooks/useGifSearch";
import { useRandomGif } from "@/hooks/useRandomGifs";

export default function HomeScreen() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");

	const randomGif = useRandomGif(searchTerm);
	const { data: results } = useGifSearch(searchTerm);

	const isSearching = searchTerm.length >= 2 && results;

	return (
		<View style={{ flex: 1 }}>
			<SearchBar
				value={searchTerm}
				onChange={setSearchTerm}
				onCancel={() => setSearchTerm("")}
			/>

			{isSearching ? (
				<FlatList
					data={results}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => router.push(`/details/${item.id}`)}
						>
							<GifCard gif={item} />
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
