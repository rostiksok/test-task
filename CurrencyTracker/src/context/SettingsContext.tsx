import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeType = "Light" | "Dark";

interface Settings {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  offlineMode: boolean;
  setOfflineMode: (v: boolean) => void;
}

const KEY_THEME = "app_theme";
const KEY_OFFLINE = "app_offline";

const SettingsContext = createContext<Settings>({
  theme: "Light",
  setTheme: () => {},
  offlineMode: false,
  setOfflineMode: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("Light");
  const [offlineMode, setOfflineState] = useState(false);

  useEffect(() => {
    (async () => {
      const [t, of] = await AsyncStorage.multiGet([KEY_THEME, KEY_OFFLINE]);
      if (t[1] === "Light" || t[1] === "Dark") setThemeState(t[1] as ThemeType);
      if (of[1] != null) setOfflineState(of[1] === "true");
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

  return (
    <SettingsContext.Provider
      value={{ theme, setTheme, offlineMode, setOfflineMode }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
