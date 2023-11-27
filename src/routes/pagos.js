const router = require("express").Router();
const pagosControllers = require("../controllers/pagos");

// => /api/socios...
router.get("/", pagosControllers.getStatus);
router.get("/id/:PagoId", pagosControllers.getPagoById);
router.get("/all", pagosControllers.getAll);

router.post("/", pagosControllers.create);
router.delete("/:id", pagosControllers.eliminarPago);
router.put("/:id", pagosControllers.actualizarPago);


module.exports = router;