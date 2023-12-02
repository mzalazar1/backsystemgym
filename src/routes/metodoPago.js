const router = require("express").Router();
const metodoPagoControllers = require("../controllers/metodoPago");

// => /api/socios...
router.get("/", metodoPagoControllers.getStatus);
router.get("/id/:MetId", metodoPagoControllers.getMetById);
router.get("/all", metodoPagoControllers.getAll);

router.post("/", metodoPagoControllers.create);
router.delete("/:id", metodoPagoControllers.eliminarMet);
router.put("/:id", metodoPagoControllers.actualizarMet);


module.exports = router;