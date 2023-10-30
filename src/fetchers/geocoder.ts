import axios from "axios";

import { TomTomGeocoderResponse } from "./types";

export const fetchGeocodingFromAddress = async (
  address: string,
): Promise<TomTomGeocoderResponse> => {
  const { data } = await axios.get<TomTomGeocoderResponse>(
    `https://api.tomtom.com/search/2/geocode/${address}.json?storeResult=false&lat=55.3781&lon=3.4360&view=Unified&key=${process.env.TOM_TOM_API_KEY}`,
  );
  return data;
};
