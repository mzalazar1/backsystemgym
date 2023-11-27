const router = require("express").Router();
const estadosCuotasControllers = require("../controllers/estadosCuotas");

// => /api/socios...
router.get("/", estadosCuotasControllers.getStatus);
router.get("/id/:EstadoCuotaId", estadosCuotasControllers.getEstadoCuotaById);
router.get("/all", estadosCuotasControllers.getAll);

router.post("/", estadosCuotasControllers.create);
router.delete("/:id", estadosCuotasControllers.eliminarEstadoCuota);
router.put("/:id", estadosCuotasControllers.actualizarEstadoCuota);


module.exports = router;