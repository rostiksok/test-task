import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSettings } from "@/context";
import { ScreenContainer, Switchbox, ToggleGroup } from "@/components";
import { ThemeType } from "@/theme";

export default function SettingsScreen() {
  const { theme, setTheme, offlineMode, setOfflineMode, colors, sizes } =
    useSettings();

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: sizes.font.h2 }}>
        Appearance
      </Text>
      <View
        style={[
          styles.settingRow,
          {
            padding: sizes.padding,
            backgroundColor: colors.card,
            borderRadius: sizes.cardRadius,
            marginVertical: 10,
          },
        ]}
      >
        <View style={styles.labelWrapper}>
          <FontAwesome
            name="moon-o"
            size={sizes.iconSize}
            color={colors.text}
            style={{ marginRight: sizes.smallPadding }}
          />
          <Text style={{ color: colors.text, fontSize: sizes.font.body }}>
            Theme
          </Text>
        </View>

        <ToggleGroup
          options={["Light", "Dark"]}
          selected={theme}
          onSelect={(t: string) => setTheme(t as ThemeType)}
        />
      </View>

      <Text style={{ color: colors.text, fontSize: sizes.font.h2 }}>Mode</Text>

      <View
        style={[
          styles.settingRow,
          {
            padding: sizes.padding,
            backgroundColor: colors.card,
            borderRadius: sizes.cardRadius,
            marginVertical: 10,
          },
        ]}
      >
        <View style={styles.labelWrapper}>
          <FontAwesome
            name="wifi"
            size={sizes.iconSize}
            color={colors.text}
            style={{ marginRight: sizes.smallPadding }}
          />
          <Text style={{ color: colors.text, fontSize: sizes.font.body }}>
            Offline
          </Text>
        </View>
        <Switchbox value={offlineMode} onValueChange={setOfflineMode} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
