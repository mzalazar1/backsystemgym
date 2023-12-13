const router = require("express").Router();
const logsControllers = require("../controllers/logs");

router.post('/', logsControllers.crearLog);

router.get("/", logsControllers.getStatus);
router.get("/id/:LogId", logsControllers.getLogById);
router.get("/all", logsControllers.getAll);

router.post("/", logsControllers.create);
router.delete("/:id", logsControllers.eliminarLog);
router.put("/:id", logsControllers.actualizarLog);


module.exports = router;