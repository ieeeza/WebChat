import express from "express";
import prisma from "../services/PrismaClient.js";

const router = express();

router.post("/", async (req, res) => {
   await prisma.users.create({
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
   const { email, phoneNumber, password } = req.query;

   try {
      if (!email && !phoneNumber && !password) {
         return res.status(400).json({ error: "Informe email, phoneNumber ou password." });
      }
      
      const user = await prisma.users.findFirst({
         where: {
            email: email || undefined,
            phoneNumber: phoneNumber || undefined,
            password: password || undefined
         }
      });

      if (user) {
         const response = {
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password
         };
         res.status(200).json(response);
      } else {
         res.status(404).send("Usuário não encontrado");
      }
   } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
   }
});

export default router;
