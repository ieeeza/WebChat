import express from "express";
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
import { createServer } from "http";

const prisma = new PrismaClient();

const app = express();
const server = createServer(app);

app.post("/Users", async (request, response) => {

   await prisma.Users.create({
      data: {
         email: request.body.email,
         password: request.body.password,
      }
   })

   response.send("Ok Certo")
});

app.put("/users/:id", async (request, response) => {

   await prisma.Users.update({
      where: {
         id: parseInt(request.params.id)
      },
      data: {
         username: request.body.username,
         email: request.body.email,
         password: request.body.password,
         phonenumber: request.body.phonenumber
      }
   })

   response.status(201).json(request.body);
})

app.get("/Users", async (request, response) => {

   const { email } = request.query;

   const user = await prisma.Users.findUnique({
      where: {
         email: email
      }
   });

   if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
   }

   return response.status(200).json(user.email);
});

app.delete("/users/:id", async (request, response) => {

   await prisma.Users.delete({
      where: {
         id: parseInt(request.params.id)
      },
   })

   response.status(201).json({ message: "Usuário deletado!" });
})

const io = new Server(server, {
   cors: {
      origin: ["http://localhost:5000", "http://localhost:5173"], 
      methods: ["GET", "POST"]
   },
});

io.on("connection", (socket) => {
   console.log("usuário conectado", socket.id);

   socket.on("sendMessage", (message) => {
      console.log(message);
      io.emit("receiveMessage", message);
   });

   socket.on("disconnect", () => {
      console.log("usuário desconectado", socket.id);
   });
});

server.listen(5000, () => {
   console.log("servidor rodando em http://localhost:5000")
});
