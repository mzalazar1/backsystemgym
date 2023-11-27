const router = require("express").Router();
const usuariosControllers = require("../controllers/usuarios");

// => /api/socios...
router.get("/", usuariosControllers.getStatus);
router.get("/id/:UsuarioId", usuariosControllers.getUsuarioById);
router.get("/all", usuariosControllers.getAll);

router.post("/", usuariosControllers.create);
router.delete("/:id", usuariosControllers.eliminarUsu);
router.put("/:id", usuariosControllers.actualizarUsu);


module.exports = router;