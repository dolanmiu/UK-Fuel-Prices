import axios from "axios";

import { StoreFetchResponse } from "./types";

export const fetchStoreFuelStations = async (
  url: string,
): Promise<StoreFetchResponse> => {
  console.log(`Fetching from ${url}`);
  const { data } = await axios.get<StoreFetchResponse>(url, {
    headers: {
      "User-Agent": "insomnia/8.3.0",
    },
  });
  console.log(`Fetched from ${url}. Fuel prices from: ${data.last_updated}`);
  return data;
};
