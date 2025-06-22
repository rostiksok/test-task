import axios from "axios";
import { BASE_URL, API_KEY } from "@env";

export type RatesResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
  error?: {
    code: number;
    type: string;
    info: string;
  };
};

export async function fetchRates(): Promise<RatesResponse> {
  const url = `${BASE_URL}/latest`;
  const response = await axios.get<RatesResponse>(url, {
    params: {
      access_key: API_KEY,
    },
  });

  if (!response.data.success) {
    throw new Error(`Fixer API error: ${response.data.error?.info}`);
  }

  return response.data;
}
