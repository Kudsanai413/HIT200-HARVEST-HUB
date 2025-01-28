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
                tabBarActiveTintColor: '#067c00',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Appearance.getColorScheme() === "light" ? app_colors.white : app_colors.dark_bg,
                    height: 50,
                    flexDirection: "column"
                },

            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabIcon color={ color } size={25} icon="home" iconType='fontawesome'/>,
                    animation: "shift"
                }}
            />

            <Tabs.Screen
                name="Search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color }) => <TabIcon color={ color } size={25} icon="search"iconType="materials"/>,
                    animation: "shift",
                }}
            />

            <Tabs.Screen
                name="FarmerProduce"
                options={{
                    title: "My Produce",
                    tabBarIcon: ({ color }) => <TabIcon color={ color } size={25} icon="leaf" iconType="fontawesome"/>,
                    animation: "shift"
                }}
            />
        </Tabs>
    );
}