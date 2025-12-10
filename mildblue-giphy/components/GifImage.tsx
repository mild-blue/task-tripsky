import { Image, ImageStyle, StyleSheet } from "react-native";

type GifImageProps = {
	url: string;
	style?: ImageStyle;
};

export function GifImage({ url, style }: GifImageProps) {
	return (
		<Image
			source={{ uri: url }}
			style={[styles.image, style]}
			resizeMode="cover"
		/>
	);
}

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 300,
		borderRadius: 12,
	},
});
