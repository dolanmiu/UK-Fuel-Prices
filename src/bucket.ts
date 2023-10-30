import { FuelStation } from "./fetchers/types";

export type Bucket = Record<string, Record<string, FuelStation[]>>;

const startLatitude = 49;
const endLatitude = 59;
const startLongitude = -8;
const endLongitude = 2;

const step = 0.1;

export const floorToOneDecimalPlace = (num: number) =>
  Math.floor(num * 10) / 10;

const createLongitudeBuckets = (): Record<string, number[]> =>
  Array((endLongitude - startLongitude) / step)
    .fill(undefined)
    .map((_, i) => floorToOneDecimalPlace(i * step + startLongitude))
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: [],
      }),
      {},
    );

export const buckets: Bucket = Array((endLatitude - startLatitude) / step)
  .fill(undefined)
  .map((_, i) => floorToOneDecimalPlace(i * step + startLatitude))
  .reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: createLongitudeBuckets(),
    }),
    {},
  );

const getFuelStationsFromLatitudeAndLongitude = (
  latitude: number,
  longitude: number,
): FuelStation[] => {
  return (
    buckets[floorToOneDecimalPlace(latitude)]?.[
      floorToOneDecimalPlace(longitude)
    ] ?? []
  );
};

export const getFuelStationsFromLatitudeAndLongitudeRadius = (
  latitude: number,
  longitude: number,
): FuelStation[] => {
  const neighbors = [
    getFuelStationsFromLatitudeAndLongitude(latitude - step, longitude - step),
    getFuelStationsFromLatitudeAndLongitude(latitude - step, longitude),
    getFuelStationsFromLatitudeAndLongitude(latitude - step, longitude + step),
    getFuelStationsFromLatitudeAndLongitude(latitude, longitude - step),
    getFuelStationsFromLatitudeAndLongitude(latitude, longitude + step),
    getFuelStationsFromLatitudeAndLongitude(latitude + step, longitude - step),
    getFuelStationsFromLatitudeAndLongitude(latitude + step, longitude),
    getFuelStationsFromLatitudeAndLongitude(latitude + step, longitude + step),
  ]
    .flat()
    .filter(Boolean);

  return [
    getFuelStationsFromLatitudeAndLongitude(latitude, longitude),
    ...neighbors,
  ]
    .flat()
    .filter(Boolean);
};
