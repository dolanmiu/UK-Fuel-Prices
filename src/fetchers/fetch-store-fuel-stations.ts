import axios from "axios";
import UserAgent from 'user-agents';

const userAgent = new UserAgent({ deviceCategory: 'desktop' })

import { StoreFetchResponse } from "./types";

export const fetchStoreFuelStations = async (
  url: string,
): Promise<StoreFetchResponse> => {
  console.log(`Fetching from ${url}`);
  const { data } = await axios.get<StoreFetchResponse>(url, {
    headers: {
      "User-Agent": userAgent.data.userAgent,
    },
  });
  console.log(`Fetched from ${url}. Fuel prices from: ${data.last_updated}`);
  return data;
};
