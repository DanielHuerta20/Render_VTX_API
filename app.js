const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
} else {
  dotenv.config({ path: `.env.production` });
}
const Server = require("./models/server");

const server = new Server();

server.listen();
