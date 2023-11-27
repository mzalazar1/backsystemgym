const router = require("express").Router();
const rolesControllers = require("../controllers/roles");

// => /api/socios...
router.get("/", rolesControllers.getStatus);
router.get("/id/:RolId", rolesControllers.getRolById);
router.get("/all", rolesControllers.getAll);

router.post("/", rolesControllers.create);
router.delete("/:id", rolesControllers.eliminarRol);
router.put("/:id", rolesControllers.actualizarRol);


module.exports = router;