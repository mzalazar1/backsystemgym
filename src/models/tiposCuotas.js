const mongoose = require("mongoose");

const { Schema } = mongoose;

const TiposCuotasSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    importe: {
        type: Number,
        required: true,
    }

});

module.exports = mongoose.model("TipoCuota", TiposCuotasSchema);