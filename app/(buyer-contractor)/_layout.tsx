import { app_colors } from "@/assets/styles/colors";
import TabIcon from "@/Components/TabIcon";
import { Tabs } from "expo-router";
import { Appearance } from "react-native";

type props = {
    userType: string
}

export default function Layout()
{
    return(
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#067c00',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: Appearance.getColorScheme() === "light" ? app_colors.white : app_colors.dark_bg,
                    height: 50,
                },

            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabIcon color={ color } size={26} icon="home" iconType='fontawesome'/>,
                }}
            />
            <Tabs.Screen
                name="Produce-List"
                options={{
                    title: 'Produce Store',
                    tabBarIcon: ({ color }) => <TabIcon color={ color } size={26} icon="store" iconType='material'/>,
                }}
            />
        </Tabs>
    );
}