import { useSettings } from "@/context";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ToggleGroupProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function ToggleGroup({
  options,
  selected,
  onSelect,
}: ToggleGroupProps) {
  const { colors, sizes } = useSettings();

  return (
    <View style={[styles.toggleGroup, { borderRadius: sizes.cardRadius }]}>
      {options.map((option) => {
        const isActive = option === selected;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            style={[
              styles.toggleButton,
              isActive && { backgroundColor: colors.primary },
            ]}
          >
            <Text style={[styles.toggleText, isActive && { color: "#012f6c" }]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleGroup: {
    flexDirection: "row",
    overflow: "hidden",
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#ff8000",
  },
  toggleText: {
    fontSize: 16,
    color: "#333",
  },
  toggleTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
