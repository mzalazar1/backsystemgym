const mongoose = require("mongoose");

const { Schema } = mongoose;

const SociosSchema = new Schema({
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
    tel: {
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
    isDeleted: {
        type: Boolean,
        default: false,
    }

});

module.exports = mongoose.model("Socio", SociosSchema);