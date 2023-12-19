const mongoose = require("mongoose");

const { Schema } = mongoose;

const DescuentosSchema = new Schema({

    descripcion: {
        type: String,
        required: true,
    },
    porcentaje: {
        type: Number,
        required: true,
    }

}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("Descuento", DescuentosSchema);