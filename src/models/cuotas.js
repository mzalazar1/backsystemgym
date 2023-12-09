const mongoose = require("mongoose");

const { Schema } = mongoose;

const CuotasSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    socio: {
        type: String,
        required: true,
    },
    actividad: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        default: false,
    }

}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("Cuota", CuotasSchema); 