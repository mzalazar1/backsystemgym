const router = require("express").Router();
const tiposCuotasControllers = require("../controllers/tiposCuotas");

// => /api/socios...
router.get("/", tiposCuotasControllers.getStatus);
router.get("/id/:TipoCuotaId", tiposCuotasControllers.getTipoCuotaById);
router.get("/all", tiposCuotasControllers.getAll);

router.post("/", tiposCuotasControllers.create);
router.delete("/:id", tiposCuotasControllers.eliminarTipoCuota);
router.put("/:id", tiposCuotasControllers.actualizarTipoCuota);


module.exports = router;