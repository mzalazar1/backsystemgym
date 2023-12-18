const router = require("express").Router();
const asistenciasControllers = require("../controllers/asistencias");

// => /api/socios...
router.get("/", asistenciasControllers.getStatus);
router.get("/id/:AsistenciaId", asistenciasControllers.getAsistenciaById);
router.get("/all", asistenciasControllers.getAll);

router.post("/", asistenciasControllers.create);
router.delete("/:id", asistenciasControllers.eliminarAsistencia);
router.put("/:id", asistenciasControllers.actualizarAsistencia);


module.exports = router;