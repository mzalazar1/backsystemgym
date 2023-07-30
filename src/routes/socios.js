const router = require("express").Router();
const sociosControllers = require("../controllers/socios");

// => /api/socios...
router.get("/", sociosControllers.getAll);
router.post("/add", sociosControllers.create);
router.put("/update/:id", sociosControllers.actualizarSoc);
router.delete("/delete/:id", sociosControllers.eliminarSoc);


module.exports = router;