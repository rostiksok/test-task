import { useSettings } from "@/context";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";


interface SwitchboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function Switchbox({ value, onValueChange }: SwitchboxProps) {
  const { colors } = useSettings();
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 20 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const toggle = () => {
    onValueChange(!value);
  };

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.switch,
        value ? { backgroundColor: colors.primary } : styles.switchOff,
      ]}
    >
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switch: {
    width: 50,
    height: 30,
    borderRadius: 30,
    padding: 2,
    justifyContent: "center",
  },
  switchOn: {
    backgroundColor: "#f60",
  },
  switchOff: {
    backgroundColor: "#ddd",
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
  },
});
