import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

type CurrencyCardProps = {
  code: string;
  rate: number;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function CurrencyCard({
  code,
  rate,
  onPress,
}: CurrencyCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Text style={styles.code}>{code}</Text>
        <Text style={styles.rate}>{rate.toFixed(4)}</Text>
      </View>
      <Text style={styles.footer}>Base: USD</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,

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
    fontWeight: "400",
  },
  footer: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
  },
});
