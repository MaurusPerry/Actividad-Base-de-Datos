import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import pedidosController from "../controllers/pedidos.controller.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

router.get("/", verifyToken, PedidosController.getPedidos);
router.get("/usuario", verifyToken, PedidosController.getPedidosByUser);
router.get("/:id,", verifyToken, PedidosController.getPedidoById);
router.post("/", verifyToken, PedidosController.createPedido);
router.put("/:id/aceptar", verifyToken, verifyAdmin, PedidosController.aceptarPedido);
router.put("/:id/comenzar", verifyToken, verifyAdmin, PedidosController.comenzarPedido);
router.put("/:id/entregar", verifyToken, verifyAdmin, PedidosController.entregarPedido);
router.delete("/", verifyToken, verifyAdmin, PedidosController.deletePedido)

export default router;
