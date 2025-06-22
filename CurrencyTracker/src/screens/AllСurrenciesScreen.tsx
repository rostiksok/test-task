import React, { useState, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import CurrencyCard from "../components/CurrencyCard";
import { useRates } from "../hooks/useRates";
import SearchInput from "../components/SearchInput";
import { useFavoritesContext } from "../context/FavoritesContext";

export default function AllCurrenciesScreen() {
  const { data, loading, error } = useRates();
  const { favorites, toggleFavorite } = useFavoritesContext();
  const [query, setQuery] = useState("");

  const rates = data?.rates ?? {};
  const allCurrencies = useMemo(
    () => Object.entries(rates).map(([code, rate]) => ({ code, rate })),
    [rates]
  );
  const filtered = useMemo(
    () =>
      allCurrencies.filter((c) =>
        c.code.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [allCurrencies, query]
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  if (!data) {
    return (
      <View style={styles.center}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search by currency code..."
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <CurrencyCard
            code={item.code}
            rate={item.rate as number}
            isFavorite={favorites.includes(item.code)}
            onToggleFavorite={() => toggleFavorite(item.code)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No currencies match “{query}”</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
