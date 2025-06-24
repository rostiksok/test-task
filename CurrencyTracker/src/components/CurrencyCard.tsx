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
  const { colors } = useSettings();

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.card, borderRadius: 8 }]}>
      <View style={styles.row}>
        <View>
          <Text style={[styles.code, {color: colors.text}] }>{code}</Text>
          <Text style={[styles.rate, {color:colors.text}]}>{rate.toFixed(4)}</Text>
        </View>
        <TouchableOpacity onPress={onToggleFavorite}>
          <FontAwesome
            name={isFavorite ? "star" : "star-o"}
            size={24}
            color={isFavorite ? "#ff8000" : "#ccc"}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Base: USD</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  code: {
    fontSize: 18,
    fontWeight: "600",
  },
  rate: {
    fontSize: 16,
    marginTop: 4,
  },
  footer: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
  },
});
