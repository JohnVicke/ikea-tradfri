import express from "express";
import { discoverGateway } from "node-tradfri-client";

const __prod__ = process.env.NODE_ENV === "prod";
const PORT = process.env.PORT || 42069;
const getEnv = __prod__ ? "production" : "development";

(async () => {
  const app = express();

  app.get("/", async (_, res) => {
    try {
      const result = await discoverGateway();
      if (!result) return res.send({ error: "no gateway found" });
      return res.send(result);
    } catch (err) {
      return res.send(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server started\n PORT=[${PORT}] ENV=[${getEnv}]`);
  });
})().catch((err) => console.error(err));
