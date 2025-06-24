import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { CurrencyCard, ScreenContainer, SearchInput } from "@/components";
import { useRates } from "@/hooks";
import { useFavoritesContext, useSettings } from "@/context";

export default function FavoritesScreen() {
  const { colors } = useSettings();
  const { data, loading, error } = useRates();
  const { favorites, toggleFavorite } = useFavoritesContext();

  if (loading) {
    return (
      <ScreenContainer style={styles.center}>
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer style={styles.center}>
        <Text style={{ color: colors.text }}>{error}</Text>
      </ScreenContainer>
    );
  }

  if (!data) {
    return (
      <ScreenContainer style={styles.center}>
        <Text style={{ color: colors.text }}>No data available</Text>
      </ScreenContainer>
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
      <ScreenContainer style={styles.center}>
        <Text style={{ color: colors.text }}>No favorites yet</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <FlatList
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
        contentContainerStyle={{ gap: 8 }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
