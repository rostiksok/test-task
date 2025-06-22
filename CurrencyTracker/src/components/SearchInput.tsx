import React from "react";
import { TextInput, StyleSheet } from "react-native";

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
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      autoCapitalize="characters"
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 8,
    marginVertical: 8,
  },
});
