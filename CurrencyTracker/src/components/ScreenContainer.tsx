import React from "react";
import { SafeAreaView, ViewStyle } from "react-native";
import { useSettings } from "@/context";

type ScreenContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const ScreenContainer = ({ children, style }: ScreenContainerProps) => {
  const { colors, sizes } = useSettings();

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          paddingHorizontal: sizes.padding,
          paddingTop: sizes.padding,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;
