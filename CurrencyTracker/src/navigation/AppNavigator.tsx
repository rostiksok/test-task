import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import { useSettings } from "@/context";
import {
  FavoritesScreen,
  AllCurrenciesScreen,
  SettingsScreen,
} from "@/screens";

export type RootStackParamList = {
  HomeTabs: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const { colors } = useSettings();

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.header,
        },
        headerTintColor: colors.text,
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"] = "help";

          if (route.name === "AllCurrenciesTab") {
            iconName = "bar-chart-outline";
          } else if (route.name === "FavoritesTab") {
            iconName = "star-outline";
          } else if (route.name === "SettingsTab") {
            iconName = "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      })}
    >
      <Tab.Screen
        name="AllCurrenciesTab"
        component={AllCurrenciesScreen}
        options={{ title: "Currencies" }}
      />

      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
