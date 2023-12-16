const mongoose = require("mongoose");

const { Schema } = mongoose;

const SociosSchema = new Schema({
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
}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("Socio", SociosSchema);