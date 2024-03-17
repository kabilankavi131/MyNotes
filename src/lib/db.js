import { createClient } from "redis";

const client = createClient({
  password:process.env.redis_password,
  socket: {
    host: process.env.redis_host,
    port:process.env.redis_port,
  },
});

if (!client.isOpen) {
  client.connect();
}
export { client };
