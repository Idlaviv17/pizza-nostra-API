import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const pagosRouter = express.Router();

// Agregar pago
pagosRouter.post('/', async (req, res) => {
  try {
    const pago = await prisma.pago.create({
      data: {
        comentario: req.body.comentario,
        estado: req.body.estado,
        fecha:
          req.body.fecha === undefined ? undefined : new Date(req.body.fecha),
        fin_periodo:
          req.body.fin_periodo === undefined
            ? undefined
            : new Date(req.body.fin_periodo),
        horas_trabajadas: req.body.horas_trabajadas,
        inicio_periodo:
          req.body.inicio_periodo === undefined
            ? undefined
            : new Date(req.body.inicio_periodo),
        id_empleado: req.body.id_empleado,
        id_salario: req.body.id_salario,
      },
    });
    res.json(pago);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el pago');
  }
});

// Consultar por id
pagosRouter.get('/:id', async (req, res) => {
  const pagoId = parseInt(req.params.id);
  try {
    const pago = await prisma.pago.findFirst({
      where: { id_pago: pagoId },
    });
    if (pago) {
      res.json(pago);
    } else {
      res.status(404).send(`El pago con el ID ${pagoId} no ha sido encontrado`);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(`Ha ocurrido un error al consultar el pago con el ID ${pagoId}`);
  }
});

// Consultar todos o filtrar por estado
pagosRouter.get('/', async (req, res) => {
  const { estado } = req.body;
  try {
    let pagos;
    if (estado) {
      pagos = await prisma.pago.findMany({
        where: { estado: { contains: estado } },
      });
    } else {
      pagos = await prisma.pago.findMany();
    }
    res.json(pagos);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Ha ocurrido un error al consultar los pagos`);
  }
});

// Actualizar pago
pagosRouter.put('/:id', async (req, res) => {
  try {
    const pago = await prisma.pago.update({
      where: { id_pago: parseInt(req.params.id) },
      data: {
        comentario: req.body.comentario,
        estado: req.body.estado,
        fecha:
          req.body.fecha === undefined ? undefined : new Date(req.body.fecha),
        fin_periodo:
          req.body.fin_periodo === undefined
            ? undefined
            : new Date(req.body.fin_periodo),
        horas_trabajadas: req.body.horas_trabajadas,
        inicio_periodo:
          req.body.inicio_periodo === undefined
            ? undefined
            : new Date(req.body.inicio_periodo),
        id_empleado: req.body.id_empleado,
        id_salario: req.body.id_salario,
      },
    });
    res.json(pago);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el pago');
  }
});

// Eliminar pago
pagosRouter.delete('/:id', async (req, res) => {
  try {
    const pagoEliminado = await prisma.pago.delete({
      where: { id_pago: parseInt(req.params.id) },
    });
    res.json({
      message: `El pago con el ID ${req.params.id} ha sido eliminado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el pago');
  }
});

export default pagosRouter;
