import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const salariosRouter = express.Router();

// Agregar salario
salariosRouter.post('/', async (req, res) => {
  try {
    const salario = await prisma.salario.create({
      data: {
        coste_por_hora: req.body.coste_por_hora,
        rol: req.body.rol
      },
    });
    res.json(salario);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el salario');
  }
});

// Consultar por id
salariosRouter.get('/:id', async (req, res) => {
  const salarioId = parseInt(req.params.id);
  try {
    const salario = await prisma.salario.findFirst({
      where: { id_salario: salarioId },
    });
    if (salario) {
      res.json(salario);
    } else {
      res
        .status(404)
        .send(`El salario con el ID ${salarioId} no ha sido encontrado`);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        `Ha ocurrido un error al consultar el salario con el ID ${salarioId}`
      );
  }
});

// Consultar todos
salariosRouter.get('/', async (req, res) => {
  try {
    const salarios = await prisma.salario.findMany();
    res.json(salarios);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Ha ocurrido un error al consultar los salarios`);
  }
});

// Actualizar salario
salariosRouter.put('/:id', async (req, res) => {
  try {
    const salario = await prisma.salario.update({
      where: { id_salario: parseInt(req.params.id) },
      data: {
        coste_por_hora: req.body.coste_por_hora,
        rol: req.body.rol
      },
    });
    res.json(salario);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el salario');
  }
});

// Eliminar salario
salariosRouter.delete('/:id', async (req, res) => {
  try {
    const salarioEliminado = await prisma.salario.delete({
      where: { id_salario: parseInt(req.params.id) },
    });
    res.json({
      message: `El salario con el ID ${req.params.id} ha sido eliminado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el salario');
  }
});

export default salariosRouter;
