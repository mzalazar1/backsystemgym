const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmpleadosSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
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
    },
    mail: {
        type: String,
        required: true,
    },
    fechaNac: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("Empleado", EmpleadosSchema);