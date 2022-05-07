import { createClient } from "redis";
export const client = createClient({
  url: "redis://172.17.0.1:6379",
});
