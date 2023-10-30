import { Bucket, buckets, floorToOneDecimalPlace } from "./bucket";
import { fetchFromAll } from "./fetchers/stores";
import { FuelStation } from "./fetchers/types";

export const fillBucket = (bucket: Bucket, stations: FuelStation[]) => {
  for (const station of stations) {
    const { latitude, longitude } = station.location;
    const latitudeBucket = bucket[floorToOneDecimalPlace(latitude)];
    if (!latitudeBucket) {
      continue;
    }
    const longitudeBucket = latitudeBucket[floorToOneDecimalPlace(longitude)];
    if (!longitudeBucket) {
      continue;
    }
    longitudeBucket.push(station);
  }
};

export const fetchDataToFillBucket = async () => {
  const responses = await fetchFromAll();

  for (const response of responses) {
    fillBucket(buckets, response.stations);
  }
};
