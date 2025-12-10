import React from "react";
import { Image, ImageStyle, StyleSheet, View, Text } from "react-native";

type GifImageProps = {
	url?: string | null;
	style?: ImageStyle;
};

export const GifImage = React.memo(({ url, style }: GifImageProps) => {
	const safeUrl = url ?? "";

	if (!safeUrl) {
		return (
			<View style={[styles.image, style, styles.fallbackContainer]}>
				<Text style={styles.fallbackText}>No image</Text>
			</View>
		);
	}

	return (
		<Image
			source={{ uri: safeUrl }}
			style={[styles.image, style]}
			resizeMode="cover"
		/>
	);
});

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 300,
		borderRadius: 12,
		backgroundColor: "#1A1A1A",
	},
	fallbackContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		color: "#666",
		fontSize: 14,
	},
});
