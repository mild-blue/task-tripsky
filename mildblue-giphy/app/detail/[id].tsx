import { View, Text, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchGifById } from "@/services/giphy";
import { GifCard } from "@/components/GifCard";

export default function DetailsScreen() {
	const params = useLocalSearchParams<{ id?: string; q?: string }>();
	const id = params.id as string;
	const searchTerm = typeof params.q === "string" ? params.q : undefined;
	const router = useRouter();

	function handleBack() {
		if (router.canGoBack()) {
			router.back();
			return;
		}
		router.replace({
			pathname: "/",
			params: searchTerm ? { q: searchTerm } : {},
		});
	}

	const { data } = useQuery({
		queryKey: ["gif", id],
		queryFn: () => fetchGifById(id as string),
	});

	if (!data) return <Text>Loading...</Text>;

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Button title="Back" onPress={handleBack} />
				<Text>{data.title}</Text>
			</View>
			<GifCard gif={data} />
		</View>
	);
}
