const router = require("express").Router();
const valoresCuotasControllers = require("../controllers/valoresCuotas");

// => /api/socios...
router.get("/", valoresCuotasControllers.getStatus);
router.get("/id/:ValorCuotaId", valoresCuotasControllers.getValorCuotaById);
router.get("/all", valoresCuotasControllers.getAll);

router.post("/", valoresCuotasControllers.create);
router.delete("/:id", valoresCuotasControllers.eliminarValorCuota);
router.put("/:id", valoresCuotasControllers.actualizarValorCuota);


module.exports = router;