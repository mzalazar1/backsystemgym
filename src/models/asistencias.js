const mongoose = require("mongoose");

const { Schema } = mongoose;

const AsistenciasSchema = new Schema({

    dni: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    Apellido: {
        type: String,
        required: true,
    },

    estadoCuota: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    }

},
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Asistencia", AsistenciasSchema);