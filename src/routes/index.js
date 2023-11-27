const express = require("express");
const router = express.Router();

const sociosRoutes = require("./socios");
const estadosCuotasRoutes = require("./estadosCuotas");
const actividadesRoutes = require("./actvidades");
const valoresCuotasRoutes = require("./valoresCuotas");
const pagosRoutes = require("./pagos");
const tiposCuotasRoutes = require("./tiposCuotas");
const cuotasRoutes = require("./cuotas");
const usuariosRoutes = require("./usuarios");
const logsRoutes = require("./logs");
const rolesRoutes = require("./roles");

// => /api...
router.use("/socios", sociosRoutes);
router.use("/actividades", actividadesRoutes);
router.use("/estadoscuota", estadosCuotasRoutes);
router.use("/valorescuota", valoresCuotasRoutes);
router.use("/pagos", pagosRoutes);
router.use("/tiposcuota", tiposCuotasRoutes);
router.use("/cuotas", cuotasRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/logs", logsRoutes);
router.use("/roles", rolesRoutes);


module.exports = router;