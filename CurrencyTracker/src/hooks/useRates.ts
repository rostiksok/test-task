import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSettings } from "@/context";
import { fetchRates, RatesResponse } from "@/api";

const RATES_CACHE_KEY = "cached_rates";

export function useRates() {
  const { offlineMode } = useSettings();
  const [data, setData] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      setLoading(true);
      setError(null);

      const net = await NetInfo.fetch();
      const useCache = offlineMode || !net.isConnected;

      if (useCache) {
        const cached = await AsyncStorage.getItem(RATES_CACHE_KEY);
        if (cached && !cancelled) {
          setData(JSON.parse(cached));
        } else if (!cancelled) {
          setError("No cached data");
        }
        setLoading(false);
        return;
      }

      try {
        const res = await fetchRates(); 
        if (!cancelled) {
          setData(res);
          await AsyncStorage.setItem(RATES_CACHE_KEY, JSON.stringify(res));
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, [offlineMode]);

  return { data, loading, error };
}
