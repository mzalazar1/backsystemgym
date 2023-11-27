const router = require("express").Router();
const cuotasControllers = require("../controllers/cuotas");

// => /api/socios...
router.get("/", cuotasControllers.getStatus);
router.get("/id/:CuotaId", cuotasControllers.getCuotaById);
router.get("/all", cuotasControllers.getAll);

router.post("/", cuotasControllers.create);
router.delete("/:id", cuotasControllers.eliminarCuota);
router.put("/:id", cuotasControllers.actualizarCuota);


module.exports = router;