import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

const client = new QueryClient();

export default function Layout() {
	return (
		<QueryClientProvider client={client}>
			<SafeAreaProvider>
				<Slot />
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
