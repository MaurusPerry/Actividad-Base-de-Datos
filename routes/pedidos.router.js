import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import pedidosController from "../controllers/pedidos.controller.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

router.get("/", PedidosController.getPedidos);
router.get("/usuario", PedidosController.getPedidosByUser);
router.get("/:id,", PedidosController.getPedidoById);
router.post("/", PedidosController.createPedido);
router.put("/:id/aceptar", PedidosController.aceptarPedido);
router.put("/:id/comenzar", PedidosController.aceptarPedido);
router.put("/:id/entregar", PedidosController.entregarPedido);
router.delete("/", PedidosController.deletePedido)

export default router;
