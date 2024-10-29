import express from "express";
import { createServer } from "http";
import userRoutes from "./routes/users.js";
import initializeSocket from "./socket/ioHandler.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

const server = createServer(app);
initializeSocket(server);

server.listen(5000, () => {
   console.log("Servidor rodando em http://localhost:5000");
});
