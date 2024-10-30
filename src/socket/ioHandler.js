import { Server } from "socket.io";

function initializeSocket(server) {
   const io = new Server(server, {
      cors: {
         origin: "*",
         methods: ["GET", "POST"],
         credentials: true
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
