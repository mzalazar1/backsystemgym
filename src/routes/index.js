const express = require("express");
const router = express.Router();

const sociosRoutes = require("./socios");

// => /api...
router.use("/socios", sociosRoutes);

module.exports = router;