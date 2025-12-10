import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

type SearchBarProps = {
	value: string;
	onChange: (text: string) => void;
	onCancel: () => void;
	placeholder?: string;
};

export const SearchBar = React.memo(
	({
		value,
		onChange,
		onCancel,
		placeholder = "Search GIFs...",
	}: SearchBarProps) => {
		const showCancel = value.trim().length > 0;

		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					value={value}
					onChangeText={onChange}
					placeholder={placeholder}
					returnKeyType="search"
					autoCorrect={false}
					autoCapitalize="none"
					accessibilityLabel="Search GIFs"
				/>

				{showCancel && (
					<Button
						title="Cancel"
						onPress={onCancel}
						accessibilityLabel="Cancel search input"
					/>
				)}
			</View>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		gap: 8,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 8,
	},
});
