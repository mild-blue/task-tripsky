import { View, TextInput, Button } from "react-native";

export function SearchBar({ value, onChange, onCancel }: any) {
	return (
		<View style={{ flexDirection: "row", padding: 10 }}>
			<TextInput
				style={{
					flex: 1,
					borderWidth: 1,
					padding: 10,
					borderRadius: 6,
				}}
				placeholder="Search GIFs..."
				value={value}
				onChangeText={onChange}
			/>
			{value.length > 0 && <Button title="Cancel" onPress={onCancel} />}
		</View>
	);
}
