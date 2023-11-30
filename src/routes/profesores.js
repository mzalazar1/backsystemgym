const router = require("express").Router();
const profesoresControllers = require("../controllers/profesores");

// => /api/profesores...
router.get("/", profesoresControllers.getStatus);
router.get("/id/:ProfesorId", profesoresControllers.getProfesorById);
router.get("/all", profesoresControllers.getAll);

router.post("/", profesoresControllers.create);
router.delete("/:id", profesoresControllers.eliminarProf);
router.put("/:id", profesoresControllers.actualizarProf);


module.exports = router;