import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { GifImage } from "@/components/GifImage";
import { fetchGifById } from "@/services/giphy";
import { GifCard } from "@/components/GifCard";

export default function DetailsScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ["gif", id],
		queryFn: () => fetchGifById(id as string),
	});

	if (!data) return <Text>Loading...</Text>;

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Text>{data.title}</Text>
			<GifCard gif={data} />
			<Button title="Back" onPress={() => router.back()} />
		</View>
	);
}
