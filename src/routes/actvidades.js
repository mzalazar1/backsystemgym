const router = require("express").Router();
const actividadesControllers = require("../controllers/actividades");

// => /api/socios...
router.get("/", actividadesControllers.getStatus);
router.get("/id/:ActividadId", actividadesControllers.getActividadById);
router.get("/all", actividadesControllers.getAll);

router.post("/", actividadesControllers.create);
router.delete("/:id", actividadesControllers.eliminarActividad);
router.put("/:id", actividadesControllers.actualizarActividad);


module.exports = router;