import React from "react";
import { FlatList, View } from "react-native";
import CurrencyCard from "../components/CurrencyCard";

const mockRates = [
  { code: "USD", rate: 1.0 },
  { code: "EUR", rate: 0.89 },
  { code: "GBP", rate: 0.78 },
  { code: "JPY", rate: 113.5 },
  { code: "AUD", rate: 1.45 },
  { code: "CAD", rate: 1.26 },
  { code: "CHF", rate: 0.92 },
  { code: "CNY", rate: 6.36 },
  { code: "INR", rate: 74.2 },
  { code: "RUB", rate: 74.0 },
];

export default function AllCurrenciesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <FlatList
        data={mockRates}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <CurrencyCard
            code={item.code}
            rate={item.rate}
            onPress={() => console.log("Pressed", item.code)}
          />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}
