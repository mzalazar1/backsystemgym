const mongoose = require("mongoose");

const { Schema } = mongoose;

const LogsSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    accion: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    }

}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("Log", LogsSchema);