const mongoose = require("mongoose");

const { Schema } = mongoose;

const EstadosCuotasSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    estadoActual: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("EstadoCuota", EstadosCuotasSchema);
