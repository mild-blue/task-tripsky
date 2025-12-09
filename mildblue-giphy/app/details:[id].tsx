import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { GifImage } from "@/components/GifImage";
import { fetchGifById } from "@/services/giphy";

export default function DetailsScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ["gif", id],
		queryFn: () => fetchGifById(id),
	});

	if (!data) return <Text>Loading...</Text>;

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<GifImage url={data.images.original.url} />
			<Text>{data.title}</Text>
			<Text>{data.url}</Text>
			<Text>{data.rating.toUpperCase()}</Text>
			<Button title="Back" onPress={() => router.back()} />
		</View>
	);
}
