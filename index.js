import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app";

app.set("port", process.env.PORT || 6000);

const server = createServer(app);

server.listen(process.env.PORT || 6000);
