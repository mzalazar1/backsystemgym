const mongoose = require("mongoose");

const { Schema } = mongoose;

const ActividadesSchema = new Schema({

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

},
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Actividad", ActividadesSchema);