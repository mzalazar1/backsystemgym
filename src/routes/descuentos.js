const router = require("express").Router();
const descuentosControllers = require("../controllers/descuentos");

// => /api/socios...
router.get("/", descuentosControllers.getStatus);
router.get("/id/:DescuentoId", descuentosControllers.getDescuentoById);
router.get("/all", descuentosControllers.getAll);

router.post("/", descuentosControllers.create);
router.delete("/:id", descuentosControllers.eliminarDescuento);
router.put("/:id", descuentosControllers.actualizarDescuento);


module.exports = router;