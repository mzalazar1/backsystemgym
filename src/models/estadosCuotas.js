const mongoose = require("mongoose");

const { Schema } = mongoose;

const EstadosCuotasSchema = new Schema({

    estado: {
        type: String,
        required: true,
    }
}
    ,
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("EstadoCuota", EstadosCuotasSchema);