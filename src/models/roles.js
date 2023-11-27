const mongoose = require("mongoose");

const { Schema } = mongoose;

const RolesSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Rol", RolesSchema);