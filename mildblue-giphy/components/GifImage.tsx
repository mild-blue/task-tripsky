import { Image } from "react-native";

export function GifImage({ url }: { url: string }) {
	return (
		<Image
			source={{ uri: url }}
			style={{ width: "100%", height: 300 }}
			resizeMode="contain"
		/>
	);
}
