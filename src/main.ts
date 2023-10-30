import "dotenv/config";
import Fastify from "fastify";

import { getFuelStationsFromLatitudeAndLongitudeRadius } from "./bucket";
import { fetchDataToFillBucket } from "./bucket-filler";
import { fetchGeocodingFromAddress } from "./fetchers/geocoder";

const fastify = Fastify({
  logger: true,
});

fastify.route<{
  Querystring: { query?: string };
}>({
  method: "GET",
  url: "/",
  schema: {
    querystring: {
      query: { type: "string" },
    },
  },
  handler: async (request, reply) => {
    if (!request.query.query) {
      reply.type("application/json").code(400);
      return { error: "No query provided" };
    }

    reply.type("application/json").code(200);
    const {
      results: [
        {
          position: { lat, lon },
        },
      ],
    } = await fetchGeocodingFromAddress(request.query.query);
    console.log(`Query for ${request.query.query}. lat: ${lat}, lon: ${lon}`);
    return getFuelStationsFromLatitudeAndLongitudeRadius(lat, lon);
  },
});

fastify.listen({ port: 3000 }, async (err, _address) => {
  if (err) throw err;
  // Server is now listening on ${address}
  console.log("Loading data into bucket");
  await fetchDataToFillBucket();
  console.log("Data loaded into bucket");
});

export const viteNodeApp = fastify;
