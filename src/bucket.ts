const startLatitude = 49;
const endLatitude = 59;
const startLongitude = 2;
const endLongitude = 8;

const step = 0.01;

const createLongitudeBuckets = () =>
  Array((endLongitude - startLongitude) / step)
    .fill(undefined)
    .map((_, i) => i * step + startLongitude)
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: [],
      }),
      {}
    );

export const buckets = Array((endLatitude - startLatitude) / step)
  .fill(undefined)
  .map((_, i) => i * step + startLatitude)
  .reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: createLongitudeBuckets(),
    }),
    {}
  );
