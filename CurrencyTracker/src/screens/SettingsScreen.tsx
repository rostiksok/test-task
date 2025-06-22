import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Switchbox from "../components/Switchbox";
import ToggleGroup from "../components/ToggleGroup";
import { useSettings } from "../context/SettingsContext";

export default function SettingsScreen() {
  const { theme, setTheme, offlineMode, setOfflineMode } = useSettings();

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <View style={styles.labelWrapper}>
          <FontAwesome
            name="paint-brush"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.label}>Theme</Text>
        </View>

        <ToggleGroup
          options={["Light", "Dark"]}
          selected={theme}
          onSelect={(t: string) => setTheme(t as "Light" | "Dark")}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.labelWrapper}>
          <FontAwesome name="wifi" size={24} color="#333" style={styles.icon} />
          <Text style={styles.label}>Offline Mode</Text>
        </View>
        <Switchbox value={offlineMode} onValueChange={setOfflineMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginInlineEnd: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
