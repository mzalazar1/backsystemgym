const mongoose = require("mongoose");

const { Schema } = mongoose;

const ActividadesSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },

    horarios: {
        type: String,
        required: true,
    },
    profesor: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("Actividad", ActividadesSchema);