import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const authRouter = express.Router(); 

authRouter.post("/", async (req, res) => {
  const { user, password} = req.body;
 
  if (!user || !password) return res.status(400);

  const foundUser = await prisma.usuario.findUnique({
    where: {
      nombre: user,
    },
  });

  if (!foundUser) return res.sendStatus(401); 
  
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401); 
  }
});

export default authRouter;