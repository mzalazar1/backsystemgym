const mongoose = require("mongoose");

const { Schema } = mongoose;

const AsistenciasSchema = new Schema({
    dni: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    }
},
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Asistencia", AsistenciasSchema);