import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import CurrencyCard from "../components/CurrencyCard";
import { useRates } from "../hooks/useRates";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoritesScreen() {
  const { data, loading, error } = useRates();
  const { favorites, toggleFavorite } = useFavorites();

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

  const favoriteItems = favorites
    .map((code) => ({
      code,
      rate: data.rates[code],
    }))
    .filter((item) => typeof item.rate === "number");

  if (favoriteItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No favorites yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={favoriteItems}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => (
        <CurrencyCard
          code={item.code}
          rate={item.rate}
          onToggleFavorite={() => toggleFavorite(item.code)}
          isFavorite={favorites.includes(item.code)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { paddingVertical: 8 },
});
