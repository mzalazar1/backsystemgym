const mongoose = require("mongoose");

const { Schema } = mongoose;

const MetodosPagoSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("MetodoPago", MetodosPagoSchema);