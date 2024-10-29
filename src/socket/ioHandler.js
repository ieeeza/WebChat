import { Server } from "socket.io";

function initializeSocket(server) {
   const io = new Server(server, {
      cors: {
         origin: ["http://localhost:5000", "http://localhost:5173", "https://df54-187-1-191-194.ngrok-free.app"],
         methods: ["GET", "POST"],
      },
   });

   io.on("connection", (socket) => {
      console.log("Usuário conectado", socket.id);

      socket.on("sendMessage", (message) => {
         console.log(message);
         io.emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
         console.log("Usuário desconectado", socket.id);
      });
   });

   return io;
}

export default initializeSocket;
