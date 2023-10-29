import axios from "axios";

import { StoreFetchResponse } from "./types";

export const fetchStoreFuelStations = async (
  url: string
): Promise<StoreFetchResponse> => {
  const { data } = await axios.get<StoreFetchResponse>(url);

  return data;
};
