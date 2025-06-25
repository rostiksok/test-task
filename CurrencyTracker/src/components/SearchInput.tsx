import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSettings } from "@/context";

type SearchInputProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  const { sizes } = useSettings();

  return (
    <View style={[styles.wrapper, { borderRadius: sizes.cardRadius }]}>
      <FontAwesome
        name="search"
        size={sizes.iconSize}
        color="#999"
        style={{
          marginInlineEnd: sizes.smallPadding,
        }}
      />
      <TextInput
        style={{
          flex: 1,
          fontSize: sizes.font.body,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        autoCapitalize="characters"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
