import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, ThemeType } from "@/theme";


interface SettingsContextValue {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  offlineMode: boolean;
  setOfflineMode: (v: boolean) => void;
  colors: typeof COLORS.light;
  sizes: typeof SIZES;
}

const KEY_THEME = "app_theme";
const KEY_OFFLINE = "app_offline";

const SettingsContext = createContext<SettingsContextValue>({
  theme: "Light",
  setTheme: () => {},
  offlineMode: false,
  setOfflineMode: () => {},
  colors: COLORS.light,
  sizes: SIZES,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("Light");
  const [offlineMode, setOfflineState] = useState(false);

  useEffect(() => {
    (async () => {
      const entries = await AsyncStorage.multiGet([KEY_THEME, KEY_OFFLINE]);
      const savedTheme = entries.find(([k]) => k === KEY_THEME)?.[1];
      const savedOffline = entries.find(([k]) => k === KEY_OFFLINE)?.[1];

      if (savedTheme === "Light" || savedTheme === "Dark") {
        setThemeState(savedTheme as ThemeType);
      }
      if (savedOffline != null) {
        setOfflineState(savedOffline === "true");
      }
    })();
  }, []);

  const setTheme = (t: ThemeType) => {
    setThemeState(t);
    AsyncStorage.setItem(KEY_THEME, t);
  };

  const setOfflineMode = (v: boolean) => {
    setOfflineState(v);
    AsyncStorage.setItem(KEY_OFFLINE, v ? "true" : "false");
  };

  const colors = theme === "Light" ? COLORS.light : COLORS.dark;
  const sizes = SIZES;

  return (
    <SettingsContext.Provider
      value={{ theme, setTheme, offlineMode, setOfflineMode, colors, sizes }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
