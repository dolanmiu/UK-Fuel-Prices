import Fastify from "fastify";
import { fetchFromShell } from "./fetchers/stores";
import { buckets } from "./bucket";

console.log(buckets)
const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (_request, reply) => {
  reply.type("application/json").code(200);
  const output = await fetchFromShell();
  return output;
});

fastify.listen({ port: 3000 }, (err, _address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});

export const viteNodeApp = fastify;
