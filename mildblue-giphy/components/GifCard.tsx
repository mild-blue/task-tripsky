import { getMinAgeForGiphyRating } from "@/utils/ratingFilter";
import { IGif } from "@/utils/types";
import { Image, StyleSheet, Text, View } from "react-native";

export function GifCard({ gif }: { gif: IGif }) {
	return (
		<View style={styles.card}>
			<Text style={styles.heading}>Random selected GIF</Text>
			<Image
				source={{ uri: gif.images.fixed_width_small_still.url }}
				style={styles.preview}
				resizeMode="cover"
			/>
			<View style={styles.meta}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{gif.title || "Untitled"}</Text>
					<Text style={styles.url}>
						{gif.url || "No URL provided"}
					</Text>
				</View>
				<Text style={styles.rating}>
					{getMinAgeForGiphyRating(gif.rating)}+
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		backgroundColor: "#101725",
		borderRadius: 16,
		gap: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
	},
	heading: {
		color: "#9FB4FF",
		fontSize: 12,
		letterSpacing: 1,
		textTransform: "uppercase",
	},
	preview: {
		width: "100%",
		height: 200,
		borderRadius: 12,
	},
	meta: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		flex: 1,
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
	},
	url: {
		color: "#A0A0A0",
		fontSize: 12,
	},
	rating: {
		color: "#F7C948",
		borderRadius: 50,
		paddingVertical: 4,
		paddingHorizontal: 8,
		backgroundColor: "rgba(247, 201, 72, 0.1)",
		fontSize: 12,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
});
