import { useEffect, useState } from "react";
import { fetchRates, RatesResponse } from "../api/ratesApi";

export function useRates() {
  const [data, setData] = useState<RatesResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRates()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
