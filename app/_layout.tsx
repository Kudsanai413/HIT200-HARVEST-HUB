import { ThemeProvider } from '@react-navigation/native';
import { LoginContextProvider } from "@/Context/LoginContext";
import { ProductContextProvider } from "@/Context/ProductContext";
import { DarkTheme, DefaultTheme } from '@/assets/styles/colors';
import { UserContextProvider } from "@/Context/UserContext";
import { Stack } from "expo-router";
import React from 'react';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return(
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<UserContextProvider>
				<LoginContextProvider>
					<ProductContextProvider>
						<Stack
							screenOptions={{
								headerShown: false
							}}
						>
							<Stack.Screen name="index" />
							<Stack.Screen name="(farmer)/" />
							<Stack.Screen name="(buyer-contractor)/"/>
							<Stack.Screen name="buyer-produce/"/>
						</Stack>
					</ProductContextProvider>
				</LoginContextProvider>
			</UserContextProvider>
		</ThemeProvider>
	);
}
