const mongoose = require("mongoose");

const { Schema } = mongoose;

const SociosSchema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }

});

module.exports = mongoose.model("Socio", SociosSchema);