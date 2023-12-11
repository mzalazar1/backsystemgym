const router = require("express").Router();
const accesosControllers = require("../controllers/socios");


router.post("/", accesosControllers.accesoSocio);

module.exports = router;