import { IGif } from "@/utils/types";
import { View, Image, Text } from "react-native";

export function GifCard({ gif }: { gif: IGif }) {
	return (
		<View style={{ padding: 10, flexDirection: "row" }}>
			<Image
				source={{ uri: gif.images.fixed_width_small_still.url }}
				style={{ width: 80, height: 80 }}
			/>
			<View style={{ marginLeft: 10 }}>
				<Text numberOfLines={1}>{gif.title}</Text>
				<Text style={{ fontSize: 12 }}>{gif.rating.toUpperCase()}</Text>
			</View>
		</View>
	);
}
