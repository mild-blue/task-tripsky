import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
		<SafeAreaView style={styles.screen}>
			<View style={styles.header}>
				<Button title="Back" onPress={handleBack} />
				<Text numberOfLines={2} style={styles.title}>
					{data.title || "GIF details"}
				</Text>
			</View>
			<GifCard gif={data} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: 16,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		gap: 12,
	},
	title: {
		flex: 1,
		fontSize: 18,
		fontWeight: "600",
	},
});
