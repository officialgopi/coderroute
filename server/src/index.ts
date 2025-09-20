import http from "http";
import { logger } from "./logger";
import { app } from "./app";

const server = http.createServer(app);

server.listen(3000, () => {
  logger.info("Server is running on port 3000");
});
