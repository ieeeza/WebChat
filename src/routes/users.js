import express from "express";
import prisma from "../services/PrismaClient.js";

const router = express();

router.post("/", async (req, res) => {
   await prisma.Users.create({
      data: {
         username: req.body.username,
         email: req.body.email,
         password: req.body.password,
         phoneNumber: req.body.phoneNumber
      }
   });
   res.send("Usuário criado com sucesso");
});

router.get("/", async (req, res) => {
   const user = await prisma.Users.findUnique({
      where: {
         email: req.query.email,
      }
   });

   if (!user) return res.status(404).json({
      error: "Usuário não encontrado"
   });
   res.status(200).json({
      username: user.username,
      email: user.email,
   });
});

export default router;
