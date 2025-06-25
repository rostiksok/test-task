import React, { useState, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { CurrencyCard, ScreenContainer, SearchInput } from "@/components";
import { useFavoritesContext, useSettings } from "@/context";
import { useRates } from "@/hooks";

export default function AllCurrenciesScreen() {
  const { colors, sizes } = useSettings();
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

  const resultsText =
    query.trim() === ""
      ? "All Currencies"
      : `${filtered.length} ${
          filtered.length > 1 ? "Currencies" : "Currency"
        } found`;

  return (
    <ScreenContainer>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search by code..."
      />

      {filtered.length > 0 && (
        <Text
          style={{
            color: colors.text,
            fontSize: sizes.font.h2,
            marginVertical: 8,
            fontWeight: "bold",
          }}
        >
          {resultsText}
        </Text>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <CurrencyCard
            code={item.code}
            rate={item.rate as number}
            base={data.base}
            isFavorite={favorites.includes(item.code)}
            onToggleFavorite={() => toggleFavorite(item.code)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, marginTop: 8, paddingBottom: 32 }}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text
              style={{
                color: colors.text,
                fontSize: sizes.font.h2,
                marginVertical: 8,
                fontWeight: "bold",
              }}
            >
              No currencies match “{query}”
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center" },
});
