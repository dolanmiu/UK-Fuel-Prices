import "dotenv/config";
import Fastify from "fastify";

import { getFuelStationsFromLatitudeAndLongitudeRadius } from "./bucket";
import { fetchDataToFillBucket } from "./bucket-filler";
import { fetchGeocodingFromAddress } from "./fetchers/geocoder";

console.log("Loading data into bucket");
const fetchPromise = fetchDataToFillBucket();
console.log("Data loaded into bucket");

const fastify = Fastify({
  logger: true,
});

fastify.route<{
  Querystring: { query?: string; sort?: "E10" | "E5" | "B7" };
}>({
  method: "GET",
  url: "/",
  schema: {
    querystring: {
      query: { type: "string" },
      sort: { type: "string" },
    },
  },
  handler: async (request, reply) => {
    if (!request.query.query) {
      reply.type("application/json").code(400);
      return { error: "No query provided" };
    }

    await fetchPromise;

    reply.type("application/json").code(200);
    const {
      results: [
        {
          position: { lat, lon },
        },
      ],
    } = await fetchGeocodingFromAddress(request.query.query);
    console.log(`Query for ${request.query.query}. lat: ${lat}, lon: ${lon}`);
    const stations = getFuelStationsFromLatitudeAndLongitudeRadius(lat, lon);

    const sortBy = request.query.sort?.toUpperCase();

    return [...stations].sort((a, b) => {
      if (sortBy === "E10") {
        return (
          (a.prices.E10 ?? Number.MAX_SAFE_INTEGER) -
          (b.prices.E10 ?? Number.MAX_SAFE_INTEGER)
        );
      }

      if (sortBy === "E5") {
        return (
          (a.prices.E5 ?? Number.MAX_SAFE_INTEGER) -
          (b.prices.E5 ?? Number.MAX_SAFE_INTEGER)
        );
      }

      if (sortBy === "B7") {
        return (
          (a.prices.B7 ?? Number.MAX_SAFE_INTEGER) -
          (b.prices.B7 ?? Number.MAX_SAFE_INTEGER)
        );
      }

      return 0;
    });
  },
});

fastify.listen({ port: 3000 }, async (err, _address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});

export const viteNodeApp = fastify;
