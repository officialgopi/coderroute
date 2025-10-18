import { Liveblocks } from "@liveblocks/node";
import { env } from "../../env";

const liveblocks = new Liveblocks({
  secret: env.LIVEBLOCKS_SECRET_KEY,
});

export { liveblocks };
