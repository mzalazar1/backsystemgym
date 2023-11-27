const mongoose = require("mongoose");

const { Schema } = mongoose;

const PagosSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },

    importe: {
        type: Number,
        required: true,
    },
    metodo: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("Pago", PagosSchema);