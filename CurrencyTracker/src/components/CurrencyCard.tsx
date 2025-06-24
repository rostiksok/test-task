import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSettings } from "@/context";

type CurrencyCardProps = {
  code: string;
  rate: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function CurrencyCard({
  code,
  rate,
  isFavorite,
  onToggleFavorite,
}: CurrencyCardProps) {
  const { colors, sizes } = useSettings();

  return (
    <TouchableOpacity
      style={[
        {
          padding: sizes.padding,
          backgroundColor: colors.card,
          borderRadius: sizes.cardRadius,
        },
      ]}
    >
      <View style={styles.row}>
        <View>
          <Text
            style={[
              {
                fontSize: sizes.font.h2,
                fontWeight: "600",
                color: colors.text,
              },
            ]}
          >
            {code}
          </Text>
          <Text
            style={[
              { fontSize: sizes.font.body, marginTop: 4, color: colors.text },
            ]}
          >
            {rate.toFixed(4)}
          </Text>
        </View>
        <TouchableOpacity onPress={onToggleFavorite}>
          <FontAwesome
            name={isFavorite ? "star" : "star-o"}
            size={sizes.largeIconSize}
            color={isFavorite ? "#ff8000" : "#ccc"}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={[{ fontSize: sizes.font.caption, marginTop: 8, color: "#666" }]}
      >
        Base: USD
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
