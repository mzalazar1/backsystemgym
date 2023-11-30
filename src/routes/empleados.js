const router = require("express").Router();
const empleadosControllers = require("../controllers/empleados");

// => /api/socios...
router.get("/", empleadosControllers.getStatus);
router.get("/id/:EmpleadoId", empleadosControllers.getEmpleadoById);
router.get("/all", empleadosControllers.getAll);

router.post("/", empleadosControllers.create);
router.delete("/:id", empleadosControllers.eliminarEmp);
router.put("/:id", empleadosControllers.actualizarEmp);


module.exports = router;