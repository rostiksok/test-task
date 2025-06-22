import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY).then((json) => {
      if (json) setFavorites(JSON.parse(json));
    });
  }, []);

  const save = useCallback((newFavs: string[]) => {
    setFavorites(newFavs);
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
  }, []);

  const addFavorite = useCallback(
    (code: string) => save([...favorites, code]),
    [favorites, save]
  );
  const removeFavorite = useCallback(
    (code: string) => save(favorites.filter((c) => c !== code)),
    [favorites, save]
  );
  const toggleFavorite = useCallback(
    (code: string) =>
      favorites.includes(code) ? removeFavorite(code) : addFavorite(code),
    [favorites, addFavorite, removeFavorite]
  );

  return { favorites, addFavorite, removeFavorite, toggleFavorite };
}
