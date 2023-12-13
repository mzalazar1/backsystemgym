const router = require("express").Router();
const sociosControllers = require("../controllers/socios");
const verifyToken = require('../middleware/verifyToken');

// => /api/socios...
router.get("/", sociosControllers.getStatus);
router.get("/id/:SocioId", sociosControllers.getSocioById);
router.get("/all", sociosControllers.getAll);

router.post("/", verifyToken, sociosControllers.create);
router.delete("/:id", verifyToken, sociosControllers.eliminarSoc);
router.put("/:id", verifyToken, sociosControllers.actualizarSoc);

module.exports = router;